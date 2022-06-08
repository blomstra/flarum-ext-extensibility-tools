import app from 'flarum/forum/app';

app.initializers.add('blomstra/extensibility-tools', () => {
  console.log('[blomstra/extensibility-tools] Hello, forum!');
});
