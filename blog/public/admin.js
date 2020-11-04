const deleteBlog = (btn) => {
    const blogId = btn.parentNode.querySelector('[name=blogId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
    const blogElement = btn.closest('div')

    fetch('/profile/blog/' + blogId, {
            method: 'delete',
            headers: {
                'csrf-token': csrf
            }
        })
        .then(result => {
            return result.json()
        })
        .then(data => {
            console.log(data);
            blogElement.parentNode.removeChild(blogElement)
        })
        .catch(err => {
            console.log(err)
        });
}