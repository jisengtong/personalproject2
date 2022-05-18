const get_id = (id) => document.getElementById(id);

  const amount = get_id('total-amount'),
      person = get_id('total-person');

  const btns = document.querySelectorAll('.btns'),
      bill = get_id('bill'),
      customRate = get_id('custom'),
      personCount = get_id('person-count')

  const errMsg = document.querySelectorAll('.err-msg')

  document.getElementById('form').addEventListener('keyup', () => {
      if (Number(customRate.value) > 0 && (Number(bill.value) != "" && Number(personCount.value) != 0)) {
          if (Number(customRate.value <= 100)) {
              calculate(Number(bill.value), Number(customRate.value / 100), Number(personCount.value))
          }
      }
  })

  btns.forEach(x => x.addEventListener('click', () => {
      let tip = Number(x.dataset.tip)

      document.querySelectorAll('.num-field').forEach(x => {
          x.classList.remove('ring', 'ring-red-400', 'ring-green-400')
          if (Number(x.value) === 0 || Number(x.value) === "") {
              x.classList.add('ring', 'ring-red-400')
              errMsg[x.dataset.index].innerText = "Number Cannot be 0!"
          } else {
              x.classList.add('ring', 'ring-green-400')
              errMsg[x.dataset.index].innerText = ""
              calculate(Number(bill.value), tip, Number(personCount.value))
          }
      })
  }))

  function calculate(value, percentage, headcounts) {
      let tip;
      let ttotal;
      if (value === 0 || value === NaN || (headcounts === 0 || headcounts === NaN)) {
          tip = 0;
          total = 0;
      } else {
          tip = (value * percentage) / headcounts;
          ttotal = (value / headcounts) + tip;
      }

      amount.innerText = `$${tip.toFixed(2)}`
      person.innerText = `$${ttotal.toFixed(2)}`
  }

  document.getElementById('reset').addEventListener('click', () => {
      amount.innerText = "$0.00"
      person.innerText = "$0.00"
      document.querySelectorAll('.num-field').forEach(x => {
          x.classList.remove('ring', 'ring-red-400', 'ring-green-400')
      })
      errMsg.forEach(x => x.innerText = "")
      customRate.value = ""
      bill.value = ""
      personCount.value = ""
  })
