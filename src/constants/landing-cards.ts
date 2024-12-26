export const abbreviatedSyntax: string = `
<button className="bg-black tc-white ...">
    Button
</button>
`;

export const tinyAndLightweight: string = `
npx yummacss build
`;

export const responsiveByDesignSmall: string = `
<div className="bg-black sm:w-full ...">
    Button
</div>
`;

export const responsiveByDesignMedium: string = `
<div className="bg-black md:w-full ...">
    Button
</div>
`;

export const responsiveByDesignLarge: string = `
<div className="bg-black lg:w-full ...">
    Button
</div>
`;

export const responsiveByDesignXLarge: string = `
<div className="bg-black xl:w-full ...">
    Button
</div>
`;

export const responsiveByDesignXXLarge: string = `
<div className="bg-black xxl:w-full ...">
    Button
</div>
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
