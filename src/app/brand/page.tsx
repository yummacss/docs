import type { Metadata } from "next";
import Image from "next/image";

const description = "The Yumma CSS and Yumma UI marks, and how to use them.";

export const metadata: Metadata = {
  title: "Brand",
  description,
  alternates: { canonical: "https://yummacss.com/brand" },
  openGraph: {
    title: "Brand · Yumma CSS",
    description,
    url: "https://yummacss.com/brand",
  },
};

const PRODUCTS = [
  { name: "Yumma CSS", file: "yummacss" },
  { name: "Yumma UI", file: "yummaui" },
];

// light on the light page, dark on the dark one, whatever the site theme
const VARIANTS = [
  { label: "Light", suffix: "", page: "#f7f8fb" },
  { label: "Dark", suffix: "-dark", page: "#151724" },
];

const COLORS = [
  { name: "Accent", hex: "#4c5fc7" },
  { name: "Accent on dark", hex: "#bec6f2" },
  { name: "Ink", hex: "#14171f" },
  { name: "Page", hex: "#f7f8fb" },
];

const AVOID = [
  "Change the colors of the mark or the glass.",
  "Stretch, rotate or crop it.",
  "Add shadows, outlines or other effects.",
  "Place it on a photo or a busy pattern.",
  "Use one product's mark for the other.",
];

function Download({ base }: { base: string }) {
  return (
    <span className="d:f g:3 fs:sm">
      <a href={`/brand/${base}.svg`} download className="c:accent tdl:u">
        SVG
      </a>
      <a href={`/brand/${base}.png`} download className="c:accent tdl:u">
        PNG
      </a>
    </span>
  );
}

export default function BrandPage() {
  return (
    <div className="mb:16 pt:12 @lg:gc-s:9">
      <div className="my:8">
        <h1 className="mb:2 c:ink ff:display fs:4xl fw:400">Brand</h1>
        <p className="c:ink/70 fs:lg">{description}</p>
      </div>

      {PRODUCTS.map((product) => (
        <section key={product.file} className="mb:16">
          <h2 className="mb:6 c:ink ff:display fs:xxl fw:400">
            {product.name}
          </h2>
          <div className="d:g gtc:1 g:6 @sm:gtc:2">
            {VARIANTS.map((variant) => (
              <div key={variant.label} className="d:f fd:c g:3">
                <div
                  className="d:f ai:c jc:c g:10 p:8 bw:1 bc:ink/10"
                  style={{ background: variant.page }}
                >
                  <Image
                    src={`/brand/${product.file}${variant.suffix}.svg`}
                    alt={`${product.name} mark on its tile, ${variant.label.toLowerCase()}`}
                    width={96}
                    height={96}
                    unoptimized
                  />
                  <Image
                    src={`/brand/${product.file}-mark${variant.suffix}.svg`}
                    alt={`${product.name} mark, ${variant.label.toLowerCase()}`}
                    width={72}
                    height={81}
                    unoptimized
                  />
                </div>
                <div className="d:f fw:w jc:sb g:2 c:ink/70 fs:sm">
                  <span>{variant.label}, on its tile</span>
                  <Download base={`${product.file}${variant.suffix}`} />
                </div>
                <div className="d:f fw:w jc:sb g:2 c:ink/70 fs:sm">
                  <span>{variant.label}, without the tile</span>
                  <Download base={`${product.file}-mark${variant.suffix}`} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="mb:16">
        <h2 className="mb:4 c:ink ff:display fs:xxl fw:400">Space and Size</h2>
        <p className="mb:3 max-w:xl c:ink/70 lh:5">
          Leave clear space around the mark equal to a quarter of its width.
        </p>
        <p className="max-w:xl c:ink/70 lh:5">
          Use the mark on its tile at 16 px and up, and without the tile at 24
          px and up. The tile is for icons and avatars; the mark without it sits
          next to text.
        </p>
      </section>

      <section className="mb:16">
        <h2 className="mb:6 c:ink ff:display fs:xxl fw:400">Colors</h2>
        <div className="d:g gtc:2 g:6 @sm:gtc:4">
          {COLORS.map((color) => (
            <div key={color.hex} className="d:f fd:c g:2">
              <div
                className="h:16 bw:1 bc:ink/10"
                style={{ background: color.hex }}
              />
              <span className="c:ink fs:sm">{color.name}</span>
              <code className="c:ink/70 fs:sm">{color.hex}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="mb:16">
        <h2 className="mb:4 c:ink ff:display fs:xxl fw:400">What to Avoid</h2>
        <ul className="d:f fd:c g:2 c:ink/70 lh:5">
          {AVOID.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
