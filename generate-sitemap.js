const fs = require("fs");
const path = require("path");
const { create } = require("xmlbuilder2");

const baseUrl = "http://localhost:3000"; // Use your actual development base URL

const generateSitemap = () => {
  const pagesDir = path.join(process.cwd(), "src", "pages");

  const urls = ["/"]; // Add other static pages

  const traversePages = (dir, parentPath = "") => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const relativePath = path.relative(pagesDir, filePath);
      const route = `/${path.join(
        parentPath,
        relativePath.replace(/\.js$/, "")
      )}`;

      if (fs.statSync(filePath).isDirectory()) {
        traversePages(filePath, route);
      } else if (file.endsWith(".js") && !file.startsWith("_")) {
        urls.push(route);
      }
    });
  };

  traversePages(pagesDir);

  const xml = create({ version: "1.0" })
    .ele("urlset", { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" })
    .ele("url")
    .ele("loc")
    .txt(baseUrl)
    .up()
    .up();

  urls.forEach((url) => {
    xml.ele("url").ele("loc").txt(`${baseUrl}${url}`).up().up();
  });

  const xmlString = xml.end({ prettyPrint: true });

  fs.writeFileSync("public/sitemap.xml", xmlString, "utf8");
};

generateSitemap();
