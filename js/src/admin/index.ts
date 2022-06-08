import app from 'flarum/admin/app';

app.initializers.add('blomstra/extensibility-tools', () => {
  console.log('[blomstra/extensibility-tools] Hello, admin!');
});
