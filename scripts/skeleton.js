// This function loads the parts of our skeleton 
// (navbar and footer) into html doc. 
function loadSkeleton(){
    console.log($('#navbarPlaceholder').load('./../text/nav.html'));
    console.log($('#footerPlaceholder').load('./../text/footer.html'));
}
loadSkeleton();  
