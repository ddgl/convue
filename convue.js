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
                cellElement.setAttribute("data-rowindex", rowIndex)
                cellElement.setAttribute("data-columnindex", columnIndex)
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
        },
        getNeighbours(event) {
            const cell = event.target
            const rowIndex = parseInt(cell.getAttribute("data-rowindex"))
            const columnIndex = parseInt(cell.getAttribute("data-columnindex"))
            console.log(typeof(rowIndex))
            console.log(typeof(columnIndex))
            console.log(rowIndex + ", " + columnIndex)
            let neighboursAliveCount = 0;

            const matrix = document.getElementById('matrix')

            //n1
            if(!(columnIndex == 0 || rowIndex == 0)){
                const n1 = matrix.querySelector("[data-rowindex='" + (rowIndex - 1) + "'][data-columnindex='" + (columnIndex - 1) + "']")
                console.log(n1)
                if(n1.classList.contains('living-cell')) {
                    ++neighboursAliveCount
                }
            }

            //n2
            if(!(rowIndex == 0)){
                const n2 = matrix.querySelector("[data-rowindex='" + (rowIndex - 1) + "'][data-columnindex='" + (columnIndex) + "']")
                console.log(n2)
                if(n2.classList.contains('living-cell')) {
                    ++neighboursAliveCount
                }
            }

            //n3
            if(!(rowIndex == 0 || columnIndex == this.columnCount - 1)){
                const n3 = matrix.querySelector("[data-rowindex='" + (rowIndex - 1) + "'][data-columnindex='" + (columnIndex + 1) + "']")
                console.log(n3)
                if(n3.classList.contains('living-cell')) {
                    ++neighboursAliveCount
                }
            }

            //n4
            if(!(columnIndex == 0)){ //!(columnIndex == 0)
                const n4 = matrix.querySelector("[data-rowindex='" + (rowIndex) + "'][data-columnindex='" + (columnIndex - 1) + "']")
                console.log(n4)
                if(n4.classList.contains('living-cell')) {
                    ++neighboursAliveCount
                }
            }   

            //n5
            if(!(columnIndex == this.columnCount - 1)){ //!(columnIndex == this.columnCount - 1)
                const n5 = matrix.querySelector("[data-rowindex='" + (rowIndex) + "'][data-columnindex='" + (columnIndex + 1) + "']")
                console.log(n5)
                if(n5.classList.contains('living-cell')) {
                    ++neighboursAliveCount
                }
            }

            //n6
            if(!(rowIndex == this.rowCount - 1 || columnIndex == 0)){ //!(rowIndex == this.rowCount - 1 || columnIndex == 0)
                const n6 = matrix.querySelector("[data-rowindex='" + (rowIndex + 1) + "'][data-columnindex='" + (columnIndex - 1) + "']")
                console.log(n6)
                if(n6.classList.contains('living-cell')) {
                    ++neighboursAliveCount
                }
            }

            //n7
            if(!(rowIndex == this.rowCount - 1)){ //!(rowIndex == this.rowCount - 1)
                const n7 = matrix.querySelector("[data-rowindex='" + (rowIndex + 1) + "'][data-columnindex='" + (columnIndex) + "']")
                console.log(n7)
                if(n7.classList.contains('living-cell')) {
                    ++neighboursAliveCount
                }
            }

            //n8
            if(!(columnIndex == this.columnCount - 1 || rowIndex == this.rowCount - 1)){ //!(columnIndex == this.columnCount - 1 || rowIndex == this.rowCount - 1)
                const n8 = matrix.querySelector("[data-rowindex='" + (rowIndex + 1) + "'][data-columnindex='" + (columnIndex + 1) + "']")
                console.log(n8)
                if(n8.classList.contains('living-cell')) {
                    ++neighboursAliveCount
                }
            }


            if(cell.classList.contains('dead-cell')) {
                if(neighboursAliveCount == 3) {
                    console.log("you will be resurrected, because you have exactly " + neighboursAliveCount + " neighbours")
                } else {
                    console.log("you stay dead, because you don't have exactly 3 neighbours, you have " + neighboursAliveCount + " neighbours")
                }
            } else if (cell.classList.contains('living-cell')) {
                if(neighboursAliveCount < 2) {
                    console.log("you will die, because you are lonely, because you only have " + neighboursAliveCount + " neighbours")
                } else if(neighboursAliveCount > 3){
                    console.log("you will die, because of overpopulation, because you have " + neighboursAliveCount + " neighbours")
                } else {
                    console.log("you stay alive, because the population has a reasonable size, bacause you have " + neighboursAliveCount + " neighbours")
                }
            }


        }
    },

    mounted() {
        this.$nextTick(this.initGrid())
    }

}


Vue.createApp(ConvueApp).mount('#convue-app')