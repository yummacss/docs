export const card: string = `
<div class="card">
  <div class="card-content">
    <h4 class="card-title">Heading</h4>
    <p class="card-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia velit fugit voluptates quod, placeat quam maxime earum voluptas provident, natus omnis saepe beatae vitae.</p>
    <a class="card-link">Link to page</a>
  </div>
  <button class="card-button">Button</button>
</div>
<style>
  .card {
      max-width: 23.75rem;
      border: 1px solid #e5e7e9;
      background-color: #ffffff;
      box-shadow: 1px 3px 5px -2px rgba(0, 0, 0, 0.1);
      max-width: 23.75rem;
      overflow: hidden;
      padding: 1.5rem;
      border-radius: 0.5rem;
  }

  @media (min-width: 768px) {
      .card {
          grid-column-start: 2;
          grid-row-start: 1;
      }
  }

  .card-content {
      flex-grow: 1;
  }

  .card-title {
      font-size: 30.08px;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #32323e;
  }

  .card-description {
      font-size: 1rem;
      margin-bottom: 1rem;
      color: #797983;
  }

  .card-link {
      font-size: 1rem;
      color: #d4418a;
      text-decoration-line: underline;
  }

  .card-button {
      background-color: #d4418a;
      font-weight: 600;
      height: 3rem;
      margin-bottom: 1rem;
      margin-top: 1.5rem;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      border-radius: 0.25rem;
      color: #ffffff;
      font-size: 1rem;
  }

  .card-button:hover {
      background-color: #bf3b7c;
  }

  /* CSS Reset */

  *,
  *::before,
  *::after {
      border-width: 0;
      border-style: solid;
      box-sizing: border-box;
  }

  * {
      margin: 0;
      color: inherit;
      font-family: system-ui, sans-serif;
  }

  p,
  h4, {
      overflow-wrap: break-word;
  }
</style>
`;

export const yummaCard: string = `
<div class="max-w-96 ovf-h rad-2 b-1 bc-l-silver-6 bg-white p-6 bs-xs">
  <div class="fg-1">
    <h4 class="mb-2 fs-sm fw-600 lh-1 tc-d-lead-2">Heading</h4>
    <p class="mb-4 tc-l-lead-3 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia velit fugit voluptates quod, placeat quam maxime earum voluptas provident, natus omnis saepe beatae vitae.</p>
    <a class="fs-b lh-1 tc-pink tdl-u">Link to page</a>
  </div>
  <button class="mb-4 mt-6 h-12 rad-1 bg-pink px-6 fw-600 tc-white h:bg-d-pink-1">Button</button>
</div>
`;

export const modern: string = `
<div class="b-1 bg-d-lead-4 bs-xs d-f fd-c max-w-96 rad-3">
  <div class="md:p-7 p-4">
    <h3 class="fs-sm fw-700 tc-white">
      Made with Gulp
    </h3>
    <p class="mt-2 tc-l-gray-6">
      A toolkit to automate & enhance your workflow.
    </p>
    <button class="bg-white fw-600 mt-7 px-4 py-2 rad-1" href="https://gulpjs.com/">
      Get started
    </a>
  </div>
</div>
`;

export const vibrant: string = `
<div class="b-1 bc-transparent bg-violet bs-xs d-f fd-c max-w-96 rad-3">
  <div class="md:p-7 p-4">
      <h3 class="fs-sm fw-700 tc-white">
      Made with Gulp
    </h3>
    <p class="fw-600 mt-2 tc-l-silver-6">
      A toolkit to automate & enhance your workflow.
    </p>
    <button class="bg-white fw-600 mt-7 px-4 py-2 rad-7 tc-violet" href="https://gulpjs.com/">
      Get started
    </a>
  </div>
</div>
`;

export const minimalist: string = `
<div class="b-1 bc-l-silver-6 bg-white bs-xs d-f fd-c max-w-96">
  <div class="md:p-7 p-4">
    <h3 class="ff-c fs-sm tc-d-gray-4">
      Made with Gulp
    </h3>
    <p class="ff-c mt-2 tc-gray">
      A toolkit to automate & enhance your workflow.
    </p>
    <button class="ff-c b-1 bc-l-silver-6 bg-white mt-7 px-4 py-2 tc-gray" href="https://gulpjs.com/">
      Get started
    </a>
  </div>
</div>
`;

export const classic: string = `
<div class="bg-white bs-xs d-f fd-c max-w-96 rad-3">
  <div class="md:p-7 p-4">
    <h3 class="fs-sm fw-700">
      Made with Gulp
    </h3>
    <p class="mt-2 tc-d-lead-2">
      A toolkit to automate & enhance your workflow.
    </p>
    <button class="bg-blue fw-600 mt-7 px-4 py-2 rad-1 tc-white" href="https://gulpjs.com/">
      Get started
    </a>
  </div>
</div>
`;