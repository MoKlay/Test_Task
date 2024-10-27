
function bubleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}


$(document).ready(function() {
  $('#form').submit(function(e) {
    e.preventDefault()
    const arr = JSON.parse(`[${$('#input').val()}]`)
    const result = bubleSort(arr)
    $('#show').text(result.join(' '))
    $.post('/api/Array', { array: arr, arraySort: result })
  })
})
