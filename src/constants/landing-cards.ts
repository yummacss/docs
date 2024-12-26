export const abbreviatedSyntax: string = `
<button class="bg-pink tc-white ...">
    Button
</button>
`;

export const tinyAndLightweight: string = `
npx yummacss build
`;

export const responsiveByDesignSmall: string = `
<button class="bg-pink sm:w-full ...">
    Button
</button>
`;

export const responsiveByDesignMedium: string = `
<button class="bg-pink md:w-full ...">
    Button
</button>
`;

export const responsiveByDesignLarge: string = `
<button class="bg-pink lg:w-full ...">
    Button
</button>
`;

export const responsiveByDesignXLarge: string = `
<button class="bg-pink xl:w-full ...">
    Button
</button>
`;

export const responsiveByDesignXXLarge: string = `
<button class="bg-pink xxl:w-full ...">
    Button
</button>
`;

export const uiComponents: string = `
import React from "react";
import { Button, Footer, Navbar } from "yumma-ui";
`;

export const serverComponents: string = `
import React from "react";
import { Button, Footer, Navbar } from "yumma-ui";

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Dashboard</h1>
        <Button>Add user</Button>
      </main>
      <Footer />
    </div>
  );
};

export default App;

`;
