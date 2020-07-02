let cpus = [
    {id: 1, title: 'AMD Ryzen 1300', price: 100, img: 'https://cdn.pcpartpicker.com/static/forever/images/product/62069eabe77fa79c55158028545484f2.256p.jpg'},
    {id: 2, title: 'AMD Ryzen 5 2600X', price: 200, img: 'https://www.vali.bg/UserFiles/Product/gallery_1/2AB11C70-B5DE-48FA-963C-13CC17964E63.jpg?w=256&h=256&block&cache'},
    {id: 3, title: 'AMD Ryzen 7600', price: 300, img: 'https://cdn.pcpartpicker.com/static/forever/images/product/fd7b679a51670fc1161384cf95ba464f.256p.jpg'},
];

const toHTML = (cpu) => {
    return `
        <div class="col">
        <div class="card">
            <img src="${cpu.img}" style="max-height: 256px"class="card-img-top" alt=${cpu.title}>
            <div class="card-body">
            <h5 class="card-title">${cpu.title}</h5>
            <a href="#" class="btn btn-primary" data-btn="price" data-id="${cpu.id}">Подробнее</a>
            <a href="#" class="btn btn-danger" data-btn="remove" data-id="${cpu.id}">Удалить</a>
            </div>
        </div>
        </div>
    `
};

function render(){
    const html = cpus.map(toHTML).join('');
    document.querySelector('#cpu').innerHTML = html;
};

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Ok', type: 'primary', handler(){
            priceModal.close();
        }},
        {text: 'Закрыть', type: 'danger', handler(){
            priceModal.close();
        }},
    ]
});

render();

document.addEventListener('click', (e) => {
    e.preventDefault();
    const id = +e.target.dataset.id;
    const cpu = cpus.find((c) => c.id === id);
   
    if(e.target.dataset.btn === 'price'){
        
        priceModal.setContent(`
        <p>Цена на ${cpu.title}: <strong>${cpu.price} $</strong></p>
    `)
        priceModal.open();
    }
    else if(e.target.dataset.btn === 'remove'){
        $.confirm({
            title: 'Вы уверены?',
            content: `
            <p>Вы удаляете: <strong>${cpu.title}</strong></p>
            `
        }).then(() => {
            //удаление
            cpus = cpus.filter((c) => c.id !== id);
            render();
        })
        .catch(() => {
            //отмена
        })
    }
})