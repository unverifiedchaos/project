
var reverseVowels=function(str){
    let array=str.split('')//this is used to split the string from "car" to 'c', 'a', 'r'
    let left=0;//first number of the word
    let right=array.length;//last number of the word since the word is split into letters;
    const vowels = ['A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u'];
    while(left<right){
        if(vowels.indexOf(array[left])===-1){//if the first letter is not existing it returns -1 i.e it is a consonent and continue to the next letter
            left++;
            continue;
        }
        if(vowels.indexOf(array[right])===-1){//same as above but opposite in this case if the last letter is consonant then go back to the prevuous letter
            right--;
            continue;
        }
        const firstletter=array[left];
        array[left]=array[right];//if the last letter is a consonant then the second-last letter is the last etter
        array[right]=firstletter;//if the first letter is a consonant then the second letter is the first letter
        left++;//then after the above function takes place we move on to the next letter in the index
        right--;//then after the above function takes place we move back to the previous letter in the index
    }
    return array.join('')

}
const answer=reverseVowels('care')
console.log(answer)