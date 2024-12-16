interface ContainerProps {
  data: string;
  stylesheet: string;
  useScroll: boolean;
  useCenter: boolean;
  usePadding: boolean;
}

const generateContainer = ({
  data,
  stylesheet,
  useScroll,
  useCenter,
  usePadding,
}: ContainerProps): string => `
  <html>
    <head>
      <link rel="stylesheet" href="${stylesheet}" />
      <style>
        body {
          ${useScroll ? "overflow-y: hidden;" : ""}
        }
        #preview-tab {
          display: ${useCenter ? "flex" : "block"};
          justify-content: ${useCenter ? "center" : "flex-start"};
          align-items: ${useCenter ? "center" : "flex-start"};
          ${usePadding ? "padding: 12px 14px;" : ""}
          ${useScroll ? "overflow-y: hidden;" : ""}
        }
      </style>
    </head>
    <body>
      <div id="preview-tab">${data}</div>
    </body>
  </html>
`;

export default generateContainer;
