

exports.index = function  (req,res){
	res.render('home/index', { title: 'Home Page', firstPara:' contents of first para ' });
}

exports.contact = function  (req,res){
	res.render('home/contact', { email: 'mail@jpca999@gmail.com', telephone:'408-457-0085'});
}