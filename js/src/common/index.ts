import app from 'flarum/common/app';

app.initializers.add('blomstra/extensibility-tools', () => {
  console.log('[blomstra/extensibility-tools] Hello, forum and admin!');
});
