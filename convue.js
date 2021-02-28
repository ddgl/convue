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
            
            let rowIndex = 0
            let columnIndex = 0
            for (var i = 0; i < this.columnCount*this.rowCount; i++) {
                console.log("cell number: " + i)
                const cellElement = document.createElement('div')
                console.log(cellElement)
                cellElement.classList.add('dead-cell')
                if(columnIndex == this.columnCount - 1) {
                    ++rowIndex
                }
                columnIndex = i%this.columnCount
                console.log("row: " + rowIndex)
                console.log("column: " + columnIndex)
                cellElement.classList.add("rowIndex-" + rowIndex)
                cellElement.classList.add("columnIndex-" + columnIndex)
                matrix.appendChild(cellElement);
            }
            console.log(matrix.children)
        },
        invertCell(cell) {
            if(cell.classList.contains('dead-cell')) {
                cell.classList.remove('dead-cell');
                cell.classList.add('living-cell');
            } else if (cell.classList.contains('living-cell')){
                cell.classList.remove('living-cell');
                cell.classList.add('dead-cell');
            }
        },
        toggleCell(event) {
            console.log(event)
            var cell = event.target
            console.log(cell)
            this.invertCell(cell)
        },
        invertCells() {
            const matrix = document.getElementById('matrix')
            const cells = matrix.children
            console.log(cells)
            for(let cell of cells) {
                console.log(cell)
                this.invertCell(cell)
            }
        }
    },

    mounted() {
        this.$nextTick(this.initGrid())
    }

}


Vue.createApp(ConvueApp).mount('#convue-app')