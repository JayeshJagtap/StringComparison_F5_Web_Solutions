var example = '3[abc]4[ab]c';

console.log(example);
console.log(string_decompression(example));

function string_decompression(s){


  function f(i){
  
    var accum = '',
        mult = '',
        curr = '';
      

    while (i !== s.length){

      // closing parenthesis
	if (s[i] === ']'){
      
        // add the last decompression
        if (curr !== ''){
          accum += customReplicate(curr,mult);
        }
        
        // exit this call
        return [accum,i];
      }
          
      // character is a digit
      if (!isNaN(parseInt(s[i]))){
      
        // add previous decompression
        if (curr !== ''){
          accum += customReplicate(curr,mult);
          
          curr = '';
          mult = s[i];
          
        } else {
          mult += s[i];
        }
        
        i++;
        
      // character is a character
      } else if (s[i] !== '['){
      
        curr += s[i];
        i++;
        
      // parenthetical group 
      } else if (s[i] === '['){
      
        // recursive call
        [tempAccum,index] = f(i + 1);

        accum += customReplicate(tempAccum,mult);
        mult = '';
        i = index + 1;
      }
    }
    
    return accum + customReplicate(curr,mult);
  }
  
  // initialize the recursion
  return f(0);
}

function customReplicate(str,times){
  return new Array(times === '' ? 1 : parseInt(times))
                 .fill(str).join('');
}