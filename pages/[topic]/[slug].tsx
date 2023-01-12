import Image from "next/image";
import dynamic from 'next/dynamic'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { serialize } from 'next-mdx-remote/serialize'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {
  PurpleBlob,
  BluePurpleBlob,
  TealBlob,
  RedBlob,
  ThreeColorsBlob,
  TealPinkBlob,
  HeroPattern,
  VerticleBlob,
} from '../../components/Svg'
import { useScript } from '../../lib/hooks'
import {
  ArticleSeo,
  MetaTags,
  RichData,
  ListItemCard,
  ScrollTopSimpleButton,
} from '../../components'
import { site } from '../../settings'
import AdBanner from '../../components/adbanner'
import { PostHeader } from '../../components/styled'
import { AnimatePresence, motion } from 'framer-motion'
const MdxProvider = dynamic(() => import('../../components/mdx/mdx-provider'))
const ScrollTopButton = dynamic(() => import('../../components/button'))

const PostPage = ({ slug, topic, frontMatter, mdxSource, relatedPosts }) => {
  const router = useRouter()
  const canonical = frontMatter.canonical || site.website + router.asPath
  const [hs, setHs] = useState([])
  const colors = [
    'bg-yellow-900 text-yellow-500',
    ' bg-green-900 text-green-500',
    'bg-indigo-900 text-indigo-500',
    'bg-indigo-900 text-indigo-500',
    'bg-purple-900 text-purple-500',
  ]

  const categories = [...new Set([topic, ...frontMatter.categories])]
  const categoriesWoutPost = categories.filter((cat) => cat !== 'post' && cat !== 'featured')
  const tags = frontMatter.tags
  const keywords = frontMatter.keywords
  //const keywords = frontMatter.keywords
  //console.log("categories", "rendered")
  const ArticleHead = React.memo(() => (
    <header className="w-full max-w-[760px] h-auto pt-0 ml-auto mr-auto relative flex flex-col items-center">
      {/*<h1 className="text-gray-800 animate-text-md text-5xl lg:text-7xl  text-center mb-4 md:mb-2 mt-8 sm:mt-0">{frontMatter.title}</h1>
            <span className="my-2 text-xs  animate-text-lg !dark:text-gray-200 !text-gray-500">UPDATED: <time dateTime={frontMatter.modified}>{frontMatter.modified}</time></span>
    */}
      <PostHeader
        headerId={frontMatter.slug}
        title={frontMatter.title}
        description={frontMatter.description}
        topics={categoriesWoutPost}
        modified={frontMatter.modified}
      />

      {/*<p className="animate-text-xl max-w-screen-md text-gray-500 md:text-lg text-center mx-auto mt-20 sm:mt-8 mb-40 sm:mb-4">{frontMatter.description}</p>*/}
      <div className="relative h-auto min-h-[250px] sm:min-h-[300px] md:min-h-[400px] w-full overflow-hidden rounded-lg mt-12 mb-4 flex flex-col justify-end">
          <motion.img
            layoutId={frontMatter.slug + "-img"}
            exit={{ opacity: 0 }}
            id="primary-image"
            layout="intrinsic"
            width={2200}
            height={1400}
            priority
            //loading="lazy"
            placeholder="blur"
            blurDataURL="/img/placeholder.webp"
            src={frontMatter.thumbnail || frontMatter.cover || '/img/placeholder.webp'}
            alt={(frontMatter.keywords && frontMatter.keywords[0]) || frontMatter.name}
            className="animate-text-2xl w-full h-full object-cover object-center absolute inset-0 transform group-hover:scale-110 transition duration-200 z-0"
          />
      </div>
      <div className="flex flex-wrap justify-center !max-w-6xl  mb-4 relative z-10 frontmatter-section-tags">
        {tags?.map((tag) => (
          <span
            key={'article-header-tag-' + tag}
            className="animate-text-4xl inline-flex mx-1 mt-2 justify-center items-center  rounded-md border-gray-50 border px-2 py-1 !text-xs font-medium dark:text-gray-300 text-gray-800"
          >
            #{tag}
          </span>
        ))}
      </div>
    </header>
  ))

  useEffect(() => {
    const headers2 = Array.from(document.querySelectorAll('h2')).map(el => ({ id: el.getAttribute("id"), text: el.innerText, level: 2 }))
    const headers3 = Array.from(document.querySelectorAll('h3')).map(el => ({ id: el.getAttribute("id"), text: el.innerText, level: 3 }))
    const headers4 = Array.from(document.querySelectorAll('h4')).map(el => ({ id: el.getAttribute("id"), text: el.innerText, level: 4 }))
    const headers = [...headers2, ...headers3, ...headers4].filter(el => Boolean(el.id))
    console.log("headers", headers)
    setHs(headers)
  }, [])

  return (
    <>
      <Head>
        <title key="h-title-tag">{frontMatter.title}</title>
        <meta name="title" content={frontMatter.title} key="h-title" />
        <meta name="description" content={frontMatter.description} key="h-description" />
        <link rel="canonical" href={frontMatter.canonical} key="h-canonical" />
        <RichData
          type="article"
          articleType={frontMatter.articleType}
          title={frontMatter.title}
          canonical={frontMatter.canonical}
          description={frontMatter.description}
          date={frontMatter.date}
          modified={frontMatter.modified}
          cover={frontMatter.cover}
          frontMatter={frontMatter}
        />
        <MetaTags
          type="article"
          title={frontMatter.title}
          descriptiopn={frontMatter.description}
          canonical={frontMatter.canonical}
          topic={frontMatter.topic}
          tags={frontMatter.tags}
          keywords={frontMatter.keywords}
          date={frontMatter.date}
          modified={frontMatter.modified}
          cover={frontMatter.cover}
          monetize={frontMatter.monetize}
          frontMatter={frontMatter}
        />
      </Head>
      <ArticleHead />
      <article className="relative pt-8 pb-32 flex flex-col items-center px-4">
        <main className="markdown-content relative post-page min-h-screen w-full max-w-[700px] h-auto pt-4 ml-auto mr-auto flex flex-col !z-10">
          <hr />
          <MdxProvider source={mdxSource} />
        </main>
        <div className="fixed top-40 w-full h-auto hidden">
        </div>

        <div className="flex flex-wrap justify-center !max-w-6xl  mt-4 pt-8">
          {keywords?.map((tag) => (
            <strong
              key={'article-footer-keywords-' + tag}
              className="inline-flex mx-2 mt-2 justify-center items-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 !text-gray-800"
            >
              {tag}
            </strong>
          ))}
        </div>
      </article>

      <hr className="border-gray-100" />

      {/* RELATED POSTS */}
      <aside className="relative pt-20 pb-10 flex flex-col items-center px-12 overflow-x-hidden">
        <h2 className="w-full max-w-[760px] mb-6 !text-left">
          {frontMatter.language === 'tr'
            ? 'Diğer blog yazıları'
            : 'Other posts you may be interested'}
        </h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-2  gap-2 md:gap-3 xl:gap-4 w-full max-w-[760px] pt-4">
          {relatedPosts.map((rp) => (
            <ListItemCard
              key={'article-featured-post-' + rp.slug}
              title={rp.title}
              topic={rp.topic}
              slug={rp.slug}
              cover={rp.cover}
              descriptiopn={rp.description}

            />
          ))}
        </ul>
      </aside>

      <ScrollTopSimpleButton />
    </>
  )
}

const variants = {
  show: ({ opacity: 1, transition: { type:"tween", ease:"easeOut" }}),
  hide: { height: 40, opacity: 0.8 }
}

const item = {
  show: { opacity: 1 },
  hide: { opacity: 0 },
}


const Toc = ({ headers }) => {
  const [isOpen, setIsOpen] = useState(false)
  const goto = (id) => window.scrollTo({ top: document.getElementById(id).offsetTop, behavior: 'smooth' })
  return (
    <motion.div style={{ 
        position: "fixed",
        bottom: 32,
        marginLeft: "auto",
        marginRight: "auto",
        width: "40vw",
        maxWidth: 500,
        minWidth: 300,
        height: "auto",
        minHeight: 40,
        zIndex: 10,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.6)", backdropFilter: "blur(30px)" 
        }}
      >
      <motion.ul
        style={{
          position: "relative",
          listStyle: 'none',
          padding: "4px 16px",
          
        }}
        custom={headers.length}
        initial={"hide"}
        animate={isOpen ? "show" : "hide"}
        variants={variants}
        onClick={() => setIsOpen(!isOpen)}
      >
        <AnimatePresence>
          {isOpen && headers.map((header, i) => (
            <motion.li 
              transition={{type: "tween"}}
              onClick={() => {goto(header.id); setIsOpen(false)}}
              style={{
                height:30,
                position: "absolute",
              }}
              initial={{y: 0, opacity: 0}}
              animate={{opacity:1, y: i * -30}}
              whileHover={{ background: "#dedede" }}
              key={"toc" + i}
              exit={{ opacity: 0, y:i * 30 }}

            >
              <span className='cursor-pointer'>{header.text}</span>
            </motion.li>
          ))
          }
        </AnimatePresence>
      </motion.ul>
    </motion.div>
  )
}

export const getStaticProps = async ({ params: { slug, topic } }) => {
  //console.log("cat & slug: ", topic, slug)
  // This will be a correct filename rather than user-defined slug
  let allPostsFrontMatters = []
  let relatedPosts = []
  let currentPostSlug
  let currentPost

  // Read all frontMatter data and store them
  fs.readdirSync(path.join('posts')).forEach((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    const { data: frontMatter } = matter(markdownWithMeta)
    allPostsFrontMatters.push(frontMatter)
  })

  // Iterate over all files to find corresponding post
  for (const frontMatter of allPostsFrontMatters) {
    // The location of the .mdx file
    //const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
    // frontmatter data
    //const { data: frontMatter } = matter(markdownWithMeta)
    //console.log("..", frontMatter)
    // slug of the iterated post
    const postSlug = frontMatter.slug //|| frontMatter.replace('.mdx', '')  // Default slug

    // topic of the iterated post
    const postTopic = frontMatter.topic

    // All possible topics including the categories
    const categories = frontMatter.categories || []
    const postTopics = [frontMatter.topic ?? 'post', ...categories].filter(Boolean)

    // if the topic prefix and slug are matches then terminate iteration
    if (postTopics.includes(topic) && postSlug === slug) {
      //console.info("Corresponding post found: ", filename)
      currentPostSlug = frontMatter.slug
      break
    }
  }
  if (!currentPostSlug) {
    throw new Error(
      `The post with a given slug couldn't be found!: (slug: ${slug}, topic${topic})`
    )
  }
  //console.log("current", currentPostSlug)
  const markdownWithMeta = fs.readFileSync(path.join('posts', currentPostSlug + '.mdx'), 'utf-8')
  const { data: frontMatter, content } = matter(markdownWithMeta)

  // Find related posts
  if (frontMatter.related && frontMatter.related.length > 0) {
    const relatedSlugs = frontMatter.related
    relatedPosts = allPostsFrontMatters.filter((postFrontMatter) => {
      if (relatedSlugs.includes(postFrontMatter.slug)) {
        return postFrontMatter
      }
    })
  }
  //console.log("relatedPosts", relatedPosts)
  //console.info("The post data: ", frontMatter)
  const mdxSource = await serialize(content)
  return {
    props: {
      frontMatter,
      slug,
      topic,
      mdxSource,
      relatedPosts,
    },
  }
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))
  //console.log("[topic]/[slug].tsx - filenames: ", files)
  const paths = []
  files.forEach((filename) => {
    // The location of the .mdx file
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

    // frontmatter data
    const { data: frontMatter } = matter(markdownWithMeta)
    //console.log("[slug] data", frontMatter)
    // The slug will be user defined in the frontmatter
    // Otherwise use default slug obtained from filename
    const slug = frontMatter.slug || filename.replace('.mdx', '') // Default slug

    const categories = frontMatter.categories || []
    const possibleTopics = [frontMatter.topic ?? 'post', ...categories].filter(Boolean)

    // Both topic and categories are selected
    const topics = [...new Set(possibleTopics)]
    //console.log("possibleTopics (unique): ", topics)
    topics.forEach((t) => paths.push({ params: { slug, topic: t } }))
  })
  //console.info("[topic]/[slug].tsx", paths)

  return {
    paths,
    fallback: false,
  }
}

export default PostPage
