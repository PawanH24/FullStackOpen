const dummy = (blogs) => {
  return 1
}

const totalLikes =(blogs) => {
  return blogs.reduce((totalLikes,blog) => totalLikes+blog.likes,0)
}

const favoriteBlog =(blogs) => {
  let highest = {}
  let c =0
  blogs.map(blog => {
    if(blog.likes>c){
      c=blog.likes
      highest = blog}
  })
  return highest
}

module.exports = {
  dummy,totalLikes,favoriteBlog
}