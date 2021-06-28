const ham = document.querySelector('.nav-item-ham')
const hamsticks = document.querySelectorAll('.hamstick')
const hamdiv = document.querySelector('.hamm');
ham.addEventListener('mouseover', () => {

    hamsticks.forEach(stick => {
        stick.style.backgroundColor = "white"
    })

    setTimeout(() => {
        hamdiv.classList.remove('gayab')
    }, 100)

}, false);
ham.addEventListener('mouseout', (e) => {
    let furtherevent = 0;
    const hamcontent = document.querySelector('.hamhover')
    hamcontent.addEventListener('mouseover', (e) => {

        if (e) {
            furtherevent = 1;
            const hamdiv = document.querySelector('.hamm');
            hamdiv.classList.remove('gayab')
            hamcontent.addEventListener('mouseout', () => {
                hamsticks.forEach(stick => {
                    stick.style.backgroundColor = "#8DDC97"
                })
                hamdiv.classList.add('gayab')

            })

        }
        else {

            hamdiv.classList.add('gayab')

        }


    }, false);
    setTimeout(() => {
        if (!furtherevent) {


            hamdiv.classList.add('gayab')
            hamsticks.forEach(stick => {
                stick.style.backgroundColor = "#8DDC97"
            })
        }
    }, 1000)


}, false);


const toggler = (div, darrow, data, type) => {
    const togglereset = () => {
        const dataadded = document.querySelectorAll(`.new-${type}`)
        console.log(dataadded)
        for (let r of dataadded) {
            r.parentNode.removeChild(r)
        }
        div.classList.remove('drop')
        darrow.classList.remove('up')
        darrow.classList.add('down')
        darrow.removeEventListener('click', togglereset, false)
        darrow.addEventListener('click', toggleset, false)




    }
    const toggleset = () => {
        let content = '';
        data.forEach(e => {
            content += ` <div class="hover-content drop drop-down new-${type}">
            <span>${e}</span>
           
          </div>`
        })
        div.insertAdjacentHTML('afterend', content)
        div.classList.add('drop')
        darrow.classList.remove('down')

        darrow.classList.add('up')
        darrow.removeEventListener('click', toggleset, false)
        darrow.addEventListener('click', togglereset, false)
    }

    darrow.addEventListener('click', toggleset, false)

}

const userdown = document.querySelector('.user-arrow-down')
const userdiv = document.querySelector('#users')
toggler(userdiv, userdown, ['Haruki', 'Sakura'], 'user')

//toggleset(div,darrow,data)
//togglereset(div,darrow,data)

//data=['Haruki','Sakura']

// const reportogglereset = () => {
//     const reports = document.querySelectorAll('.new-report')
//     console.log(reports)
//     for (let r of reports) {
//         r.classList.remove('hover-content')
//         r.classList.add('gayab')
//     }
//     reportdiv.classList.remove('drop')
//     reportdown.classList.remove('up')
//     reportdown.classList.add('down')
//     reportdown.removeEventListener('click', reportogglereset, false)
//     reportdown.addEventListener('click', reportoggle, false)




// }
// const reportoggle = () => {

//     reportdiv.insertAdjacentHTML('afterend', `<div class="hover-content drop drop-down new-report">
//     <span>TOTAL PROGRESS</span>

//   </div>
//   <div class="hover-content drop drop-down new-report">
//     <span>COURSE PROGRESS</span>

//   </div>
//   `)
//     reportdiv.classList.add('drop')
//     reportdown.classList.remove('down')

//     reportdown.classList.add('up')

//     reportdown.removeEventListener('click', reportoggle, false)
//     reportdown.addEventListener('click', reportogglereset, false)


// }
