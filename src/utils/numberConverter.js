export function changeNumber(number) {
    // input: 97842, output: 97.8k
    let result;
    let temp = number + '';
    temp = temp.split('');
    let final;
    
    if (number >= 1000 && number < 10000) {
      final = [...temp.slice(0, 1), '.', ...temp.slice(1, 2), 'k'];
      result = final.join('');
    } else if (number >= 10000 && number < 100000) {
      final = [...temp.slice(0, 2), '.', ...temp.slice(2, 3), 'k'];
      result = final.join('');
    } else if (number >= 100000 && number < 1000000) {
      final = [...temp.slice(0, 3), '.', ...temp.slice(3, 4), 'k'];
      result = final.join('');
    } else {
      result = number;
    }
    
    return result;
}