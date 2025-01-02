interface ContainerProps {
  data: string;
  stylesheet: string;
}

const generateContainer = ({ data, stylesheet }: ContainerProps): string => `
  <html>
    <head>
      <link rel="stylesheet" href="${stylesheet}" />
    </head>
    <body>
      <div>${data}</div>
    </body>
  </html>
`;

export default generateContainer;
