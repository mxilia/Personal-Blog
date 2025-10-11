import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrism from "rehype-prism-plus";
import type { Heading, Post } from "@/types/Post";
import type { TopicMeta } from "@/types/TopicMeta";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";

const postsDir : string = path.join(process.cwd(), "posts")
const postsContainer : Map<string, Post[]> = new Map<string, Post[]>()
const topicsContainer : TopicMeta[] = []
export let postsLoaded : boolean = false
let currentTopic : string = ""
let loadPromise: Promise<void> | null = null;

async function dirToPost(dir : string, config : boolean) : Promise<any> {
  const fileContent = await fs.readFileSync(dir, 'utf8')
  const matterRes = matter(fileContent)
  const headings : Heading[] = []
  const processedContent = await remark()
                                .use(remarkRehype, { allowDangerousHtml: true })
                                .use(rehypeRaw)
                                .use(rehypeSlug)
                                .use(() => (tree) => {
                                  visit(tree, "element", (node: any) => {
                                   if (/^h[2-6]$/.test(node.tagName)) {
                                     headings.push({
                                        id: node.properties?.id || "",
                                        text: node.children?.map((c: any) => c.value || "").join("")
                                      });
                                    }
                                  });
                                })
                                .use(rehypePrism)    
                                .use(rehypeStringify)
                                .process(matterRes.content)
  const contentHTML = processedContent.toString();
  if(config) return {
    'topic' : matterRes.data.topic || null,
    'href' : matterRes.data.href || null,
    'date' : matterRes.data.date || null,
    'tags' : matterRes.data.tags || [],
    'desc' : matterRes.data.desc
  }
  return {
    'title' : matterRes.data.title || null,
    'href' : matterRes.data.href || null,
    'date' : matterRes.data.date || null, 
    'order' : matterRes.data.order || null, 
    'subtopics' : headings || null, 
    'contentHTML' : contentHTML || "",
    'showSubTopics' : false
  }
}

async function walkDir(cDir : string) : Promise<undefined> {
  const children =  await fs.promises.readdir(cDir)
  for(const file of children){
    const fileDir = path.join(cDir, file)
    const stat = await fs.promises.stat(fileDir)
    if(stat.isDirectory()){
      currentTopic = file
      postsContainer.set(currentTopic, [])
      await walkDir(fileDir)
    }
    else if(file.endsWith('md')){
      if(file === "_config.md"){
        const topicMeta : TopicMeta = await dirToPost(fileDir, true)
        topicsContainer.push(topicMeta)
      }
      else {
        const post : Post = await dirToPost(fileDir, false)
        postsContainer.get(currentTopic)!.push(post)
      }
    }
  }
  return
}

class postService {

  static async loadAll() : Promise<void> {
    if(postsLoaded) return
    if(!loadPromise){
      postsContainer.clear()
      loadPromise = (async () => {
        await walkDir(postsDir);
        postsLoaded = true;
      })();
    }
    return loadPromise;
  }

  static async getAllPosts() : Promise<Map<string, Post[]>> {
    await this.loadAll()
    return postsContainer
  }

  static async topicExistence(topic : string) : Promise<boolean> {
    if(postsLoaded) return postsContainer.has(topic)
		try {
			const children =  await fs.promises.readdir(postsDir)
			for(const file of children){
				const fileDir = path.join(postsDir, file)
				const stat = await fs.promises.stat(fileDir)
				if(stat.isDirectory() && file === topic) return true
			}
			return false
		} catch(err) {
			console.log("topicExistence file error:", err)
			return false
		}
  }

  static async titleExistence(topic : string, hrefTitle : string) : Promise<boolean> {
		if(!await this.topicExistence(topic)) return false
    if(postsLoaded){
			const posts = postsContainer.get(topic)
			if(posts === undefined || posts.length === 0) return false
			const post = posts.find(post => post.href === hrefTitle)
			return post !== undefined
		}
		try {
			const cDir = path.join(postsDir, topic)
			const children =  await fs.promises.readdir(cDir)
			for(const file of children){
				const fileDir = path.join(cDir, file)
				if(file.endsWith('md') && file !== "_config.md"){
					const post : Post = await dirToPost(fileDir, false)
					if(post.href === hrefTitle) return true
				}
			}
			return false
		} catch(err) {
			console.log("titleExistence file error:", err)
			return false
		}
  }

  static async getPostsByTopic(topic : string) : Promise<Post[] | undefined> {
		if(!await this.topicExistence(topic)) return []
    if(postsLoaded) return postsContainer.get(topic)
		try {
			const cDir = path.join(postsDir, topic)
			const children =  await fs.promises.readdir(cDir)
			const posts : Post[] = []
			for(const file of children){
				const fileDir = path.join(cDir, file)
				if(file.endsWith('md') && file !== "_config.md"){
					const post : Post = await dirToPost(fileDir, false)
					posts.push(post)
				}
			}
			return posts
		} catch(err) {
			console.log("getPostsByTopic file error:", err)
			return []
		}
  }

  static async getPostByTitle(topic : string, hrefTitle : string) : Promise<Post | null> {
    if(!await this.titleExistence(topic, hrefTitle)) return null
		if(postsLoaded){
			const posts = postsContainer.get(topic)
			const post = posts!.find(post => post.href === hrefTitle)
			return post!
		}
    try {
			const cDir = path.join(postsDir, topic)
			const children =  await fs.promises.readdir(cDir)
			for(const file of children){
				const fileDir = path.join(cDir, file)
				if(file.endsWith('md') && file === hrefTitle+".md"){
					const post : Post = await dirToPost(fileDir, false)
					return post
				}
			}
			return null
		} catch(err) {
			console.log("getPostsByTitle file error:", err)
			return null
		}
  }
  
  static async getAllTopicMeta() : Promise<TopicMeta[]> {
    if(postsLoaded) return [...topicsContainer]
		try {
			const children =  await fs.promises.readdir(postsDir)
			const tempMeta : TopicMeta[] = []
			for(const file of children){
				const fileDir = path.join(postsDir, file)
				const stat = await fs.promises.stat(fileDir)
				if(!stat.isDirectory()) continue
				const configDir = path.join(fileDir, "_config.md")
        if(!fs.existsSync(configDir)) continue
				const topicMeta : TopicMeta = await dirToPost(configDir, true)
				if(topicMeta) tempMeta.push(topicMeta)
			}
			return tempMeta
		} catch(err) {
			console.log("getAllTopicMeta file error:", err)
			return []
		}
  }

}

export default postService