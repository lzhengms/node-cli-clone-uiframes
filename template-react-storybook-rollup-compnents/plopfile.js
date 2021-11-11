module.exports = function (plop) {
    // create your generators here
    plop.setGenerator('basics', {
      description: 'this is a component',
      prompts: [  // 提示问题，可以是多问题，以数组的形式表示
        {  // 可以根据输入的name动态创建组件的相关文件
          type: 'input',
          name: 'name',
          message: 'please input component name',
        },
      ],
      actions: [  // 命令完成对应的操作，可以是多操作，以数组的形式表示
        {
          type: 'add', // 创建文件
          path: 'src/components/{{name}}/index.tsx',  // 生成的文件
          templateFile: 'templates/index.tsx',  // 模板文件
        },
        {
          type: 'add',
          path: 'src/components/{{name}}/index.less',
          templateFile: 'templates/index.less',
        },
        {
          type: 'add',
          path: 'src/stories/{{name}}.stories.tsx',
          templateFile: 'templates/index.stories.tsx',
        },
      ],
    });
  };