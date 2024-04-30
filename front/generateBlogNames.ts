const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Define the path to the blog directory
const blogDirPath = path.join(process.cwd(), 'src/content/blog');

// Get all .mdx files in the blog directory
const fileNames = fs.readdirSync(blogDirPath).filter((fileName:any) => fileName.endsWith('.mdx'));

// Initialize an empty array to hold the blog data
const blogData = [];

// Iterate through each file, read its content, and parse its frontmatter
for (const fileName of fileNames) {
  const filePath = path.join(blogDirPath, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
  const slug = fileName.replace(/\.mdx$/, '');
  
  // Push an object with the title and slug into the blogData array
  blogData.push({ title: data.title, slug: `/blog/${slug}` });
}

// Define the content of the exports.ts file
const exportsContent = `export const blogNames = ${JSON.stringify(blogData, null, 2)};\n`;

// Write the content to the exports.ts file
fs.writeFileSync(path.join(process.cwd(), 'src/lib/blog.ts'), exportsContent);

console.log('Blog data has been written to src/lib/blog.ts');