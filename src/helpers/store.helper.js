import store from '../store'
export async function showConfirmDialog({title, content, onSuccess}) {
  await store.dispatch('showConfirmDialog',{title, content})
}

