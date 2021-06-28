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



const mike = document.querySelector('.mikey')
const mikediv = document.querySelector('.mike');
mike.addEventListener('mouseover', () => {
    setTimeout(() => {
        mikediv.classList.remove('gayab')
    }, 100)

}, false);
mike.addEventListener('mouseout', () => {
    let furtherevent = 0;
    const mikecontent = document.querySelector('.mikehover')
    mikecontent.addEventListener('mouseover', (e) => {

        if (e) {
            furtherevent = 1;

            mikediv.classList.remove('gayab')
            mikecontent.addEventListener('mouseout', () => {
                mikediv.classList.add('gayab')
            })

        }
        else {
            mikediv.classList.add('gayab')
        }

    }, false);
    setTimeout(() => {
        if (!furtherevent) {
            mikediv.classList.add('gayab')

        }
    }, 100)
}, false);



const bell = document.querySelector('.alert')
const belldiv = document.querySelector('.bell');
bell.addEventListener('mouseover', () => {
    setTimeout(() => {
        belldiv.classList.remove('gayab')
    })

}, false);
bell.addEventListener('mouseout', () => {
    let furtherevent = 0;
    const bellcontent = document.querySelector('.bellhover')
    bellcontent.addEventListener('mouseover', (e) => {

        if (e) {
            furtherevent = 1;

            belldiv.classList.remove('gayab')
            bellcontent.addEventListener('mouseout', () => {
                belldiv.classList.add('gayab')
            })

        }
        else {
            belldiv.classList.add('gayab')
        }

    }, false);
    setTimeout(() => {
        if (!furtherevent) {
            belldiv.classList.add('gayab')

        }
    }, 100)
}, false);

const toggler = (div, darrow, data, type) => {
    const togglereset = () => {
        const dataadded = document.querySelectorAll(`.new-${type}`)

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
toggler(userdiv, userdown, ['HARUKI', 'SAKURA'], 'user')


const contentdown = document.querySelector('.content-arrow-down')
const contentdiv = document.querySelector('#content')
toggler(contentdiv, contentdown, ['COURSE CATALOG'], 'content')


const reportdown = document.querySelector('.report-arrow-down')
const reportdiv = document.querySelector('#reports')
toggler(reportdiv, reportdown, ['TOTAL PROGRESS', 'COURSE PROGRESS'], 'report')





const admindown = document.querySelector('.admin-arrow-down')
const admindiv = document.querySelector('#admin')
toggler(admindiv, admindown, ['ZEUS LEARNING', 'ATHARVA'], 'admin')


const CardDetails = () => {
    let markup = ''
    fetch('./card.json').then(res => res.json()).then(data => {
        markup = `
        
        ${data.map(ele =>
            `
            <div class="card">
            <div class="card-body">

                <div class="card-img">
                    <img src="${ele.image ? ele.image : ''}" alt="${ele.courseDetails.name}" />
                </div>
                <div class="card-detail">
                    <div class="card-title">
                        <div class="card-name">${ele.courseDetails.name ? ele.courseDetails.name : ''}</div>
                        <div class="favicon">
                            <img
                                src="./quantum screen assets/icons/favourite.svg"
                                alt=""
                            />
                        </div>
                    </div>
                    <div class="card-subtitle">${ele.subject.name ? ele.subject.name : ''}   ${ele.subject.grade ? `| Grade  ${ele.subject.grade}` : ''}</div>
                    <div class="card-subsubtitle">
                        <strong>${ele.courseDetails.units ? ele.courseDetails.units : '0'}</strong> units <strong>${ele.courseDetails.lessons ? ele.courseDetails.lessons : '0'}</strong> Lessons
                        <strong>${ele.courseDetails.topics ? ele.courseDetails.topics : '0'}</strong> Topics
                    </div>
                    <div class="card-select">
                        <select name="" id="">
                            ${ele.classes.map(c => `<option value="Teachers-name">${c}</option>`)}
                            
                        </select>
                    </div>
                    <div class="card-classd">
                        <p>${ele.courseDetails.students ? `${ele.courseDetails.students} students |` : ''}  ${ele.courseDetails.startdate ? ele.courseDetails.startdate : ''}  ${ele.courseDetails.enddate ? `- 
                        ${ele.courseDetails.enddate}` : ''}</p>
                    </div>
                </div>
            </div>
            <div class="card-footer">
            <div class="footer-icon">
              <img src="./quantum screen assets/icons/preview.svg" alt="" />
            </div>
            <div class="footer-icon">
              <img
                src="./quantum screen assets/icons/manage course.svg"
                alt=""
              />
            </div>
            <div class="footer-icon">
              <img
                src="./quantum screen assets/icons/grade submissions.svg"
                alt=""
              />
            </div>
            <div class="footer-icon">
              <img src="./quantum screen assets/icons/reports.svg" alt="" />
            </div>
          </div>
        </div>
        `
        ).join('')}

        
        `;


        document.querySelector('#con').innerHTML = markup;

    })




}

CardDetails()













