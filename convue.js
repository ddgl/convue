const ConvueApp = {

    data() {
        return {
            app_title: 'Convue',
            columnCount: null,
            rowCount: null
        }
    },

    methods: {
        initGrid() {
            const matrix = document.getElementById('matrix')
            console.log(matrix)
            this.columnCount = getComputedStyle(matrix).getPropertyValue('--column-count')
            this.rowCount =  getComputedStyle(matrix).getPropertyValue('--row-count')
            
            for (var i = 0; i < this.columnCount*this.rowCount; i++) {
                console.log(i)
                const cellElement = document.createElement('div')
                console.log(cellElement)
                cellElement.classList.add('dead-cell')
                matrix.appendChild(cellElement);
            }
            console.log(matrix.children)
        },
        toggleCell(event) {
            console.log(event)
            var cell = event.target
            console.log(cell)
            if(cell.classList.contains('dead-cell')) {
                cell.classList.remove('dead-cell');
                cell.classList.add('living-cell');
            } else if (cell.classList.contains('living-cell')){
                cell.classList.remove('living-cell');
                cell.classList.add('dead-cell');
            }
        }
    },

    mounted() {
        this.$nextTick(this.initGrid())
    }

}


Vue.createApp(ConvueApp).mount('#convue-app')