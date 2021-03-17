var addTwoNumbers = function(l1, l2) {
    for(i=0; i<l1.length; i++){
        result=l1[i]+l2[i]
        console.log(result)
        check=l1||l2;
        if(typeof check == NaN){
            console.log('fuck me')
        }
    }
};

addTwoNumbers([1, 2, 3, 4], [1, 2, 3])