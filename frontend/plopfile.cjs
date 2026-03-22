module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "React component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase):",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.tsx",
        templateFile: "plop-templates/component.tsx.hbs",
      },
      {
        type: "add",
        path: "src/components/{{name}}/{{name}}.module.css",
        templateFile: "plop-templates/component.module.css.hbs",
      },
    ],
  });

  plop.setGenerator("page", {
    description: "Page",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Page name (PascalCase):",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/pages/{{name}}/{{name}}.tsx",
        templateFile: "plop-templates/page.tsx.hbs",
      },
      {
        type: "add",
        path: "src/pages/{{name}}/{{name}}.module.css",
        templateFile: "plop-templates/component.module.css.hbs",
      },
    ],
  });
};
