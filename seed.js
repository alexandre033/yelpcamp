var Camp = require('./db/dbcamp.js')
var Comments = require('./db/comments.js')
var data = [
  {
    name : "Montana Beach",
    image : "https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg",
    description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum,"
  },
  {
    name : "The mountain view",
    image : "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
    description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum,"
  },
  {
    name : "Family Camp",
    image : "https://farm9.staticflickr.com/8454/7930198240_856a39bf27.jpg",
    description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un peintre anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum,h"
  }
]

function seedDB(){
  Camp.remove({}, function(err){
    if(err){
      console.log(err)
    }else{
      data.forEach(function(seed){
        Camp.create(seed, function(err, campground){
          if(err){
            console.log(err)
          }else{
            Comments.create({
              title : "my new comment",
              author : "jean"
            }, function(err, comment){
              campground.comments.push(comment)
              campground.save()
            })
          }
        })
      })
    }
  })
}

module.exports = seedDB;
