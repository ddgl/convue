const ConvueApp = {

    data() {
        return {
            app_title: 'Conway\'s Game of Life',
            columnCount: null,
            rowCount: null,
            lifeDragInterval: null,
            currentCellStatus: null,
            dragFlag: false
        }
    },

    methods: {
        initGrid() {
            const matrix = document.getElementById('matrix')
            this.columnCount = getComputedStyle(matrix).getPropertyValue('--column-count')
            this.rowCount =  getComputedStyle(matrix).getPropertyValue('--row-count')
            
            let rowIndex = 0
            let columnIndex = 0
            for (var i = 0; i < this.columnCount*this.rowCount; i++) {
                const cellElement = document.createElement('div')
                Math.random() < 0.5 ? cellElement.classList.add('living-cell') : cellElement.classList.add('dead-cell')
                if(columnIndex == this.columnCount - 1) {
                    ++rowIndex
                }
                columnIndex = i%this.columnCount
                cellElement.setAttribute("data-rowindex", rowIndex)
                cellElement.setAttribute("data-columnindex", columnIndex)
                matrix.appendChild(cellElement);
            }
        },
        kill(cell){
            cell.classList.remove('living-cell');
            cell.classList.add('dead-cell');
        },
        ressurect(cell){
            cell.classList.remove('dead-cell');
            cell.classList.add('living-cell');
        },
        invert(cell) {
            if(cell.classList.contains('dead-cell')) {
                this.ressurect(cell)
            } else if (cell.classList.contains('living-cell')){
                this.kill(cell)
            }
        },
        shuffle(){
            const matrix = document.getElementById('matrix')
            const cells = matrix.children
            for(let cell of cells) {
                Math.random() < 0.5 ? this.kill(cell) : this.ressurect(cell)
            }
        },
        toggleCell(event) {
            this.dragFlag = false
            console.log(event)
            var cell = event.target
            console.log(cell)
            this.invert(cell)
        },
        invertCells() {
            const matrix = document.getElementById('matrix')
            const cells = matrix.children
            for(let cell of cells) {
                this.invert(cell)
            }
        },
        setDragFlag() {
            this.dragFlag = true
        },
        startLifeDrag() {
            this.dragFlag = false //also necessary, otherwise can't distinguish click and drag events
            this.lifeDragInterval = setInterval(() => {
                if(this.dragFlag==true && this.currentCellStatus.cell.classList.contains('dead-cell')){
                    this.ressurect(this.currentCellStatus.cell)
                }
            },30)
        },
        endLifeDrag(event) {
            clearInterval(this.lifeDragInterval)
        },
        killAll() {
            const matrix = document.getElementById('matrix')
            const cells = matrix.children
            for(let cell of cells) {
                if (cell.classList.contains('living-cell')){
                    this.kill(cell)
                }
            }
        },
        getStatusByHover(event) {
            const cell = event.target
            this.currentCellStatus = this.getStatus(cell)
        },

        getStatus(cell) {
            const isAlive = cell.classList.contains('living-cell')
            const rowIndex = parseInt(cell.getAttribute("data-rowindex"))
            const columnIndex = parseInt(cell.getAttribute("data-columnindex"))
            let neighboursAliveCount = 0;
            const matrix = document.getElementById('matrix')

            /*
            *n1 n2 n3
            *n8    n4
            *n7 n6 n5 
            */

            //n1
            if(!(columnIndex == 0 || rowIndex == 0)){
                const n1 = matrix.querySelector("[data-rowindex='" + (rowIndex - 1) + "'][data-columnindex='" + (columnIndex - 1) + "']")
                if(n1.classList.contains('living-cell')) {
                    ++neighboursAliveCount
                }
            }

            //n2
            if(!(rowIndex == 0)){
                const n2 = matrix.querySelector("[data-rowindex='" + (rowIndex - 1) + "'][data-columnindex='" + (columnIndex) + "']")
                if(n2.classList.contains('living-cell')) {
                    ++neighboursAliveCount
                }
            }

            //n3
            if(!(rowIndex == 0 || columnIndex == this.columnCount - 1)){
                const n3 = matrix.querySelector("[data-rowindex='" + (rowIndex - 1) + "'][data-columnindex='" + (columnIndex + 1) + "']")
                if(n3.classList.contains('living-cell')) {
                    ++neighboursAliveCount
                }
            }

            //n4
            if(!(columnIndex == this.columnCount - 1)){
                const n5 = matrix.querySelector("[data-rowindex='" + (rowIndex) + "'][data-columnindex='" + (columnIndex + 1) + "']")
                if(n5.classList.contains('living-cell')) {
                    ++neighboursAliveCount
                }
            }

            //n5
            if(!(columnIndex == this.columnCount - 1 || rowIndex == this.rowCount - 1)){
                const n8 = matrix.querySelector("[data-rowindex='" + (rowIndex + 1) + "'][data-columnindex='" + (columnIndex + 1) + "']")
                if(n8.classList.contains('living-cell')) {
                    ++neighboursAliveCount
                }
            }

            //n6
            if(!(rowIndex == this.rowCount - 1)){
                const n7 = matrix.querySelector("[data-rowindex='" + (rowIndex + 1) + "'][data-columnindex='" + (columnIndex) + "']")
                if(n7.classList.contains('living-cell')) {
                    ++neighboursAliveCount
                }
            }

            //n7
            if(!(rowIndex == this.rowCount - 1 || columnIndex == 0)){
                const n6 = matrix.querySelector("[data-rowindex='" + (rowIndex + 1) + "'][data-columnindex='" + (columnIndex - 1) + "']")
                if(n6.classList.contains('living-cell')) {
                    ++neighboursAliveCount
                }
            }

            //n8
            if(!(columnIndex == 0)){
                const n4 = matrix.querySelector("[data-rowindex='" + (rowIndex) + "'][data-columnindex='" + (columnIndex - 1) + "']")
                if(n4.classList.contains('living-cell')) {
                    ++neighboursAliveCount
                }
            }

            var nextGenerationMessage = ""

            if(!isAlive) {
                if(neighboursAliveCount == 3) {
                    nextGenerationMessage = "You will be resurrected, because you have exactly 3 neighbours."
                } else {
                    nextGenerationMessage = "You stay dead, because you don't have exactly 3 neighbours."
                }
            } else if (isAlive) {
                if(neighboursAliveCount < 2) {
                    nextGenerationMessage = "You will die, because you are lonely."
                } else if(neighboursAliveCount > 3){
                    nextGenerationMessage = "You will die, because of overpopulation."
                } else {
                    nextGenerationMessage = "You stay alive, because the population has a reasonable size."
                }
            }

            const currentCellStatus = {cell:cell, rowIndex:rowIndex, columnIndex:columnIndex, isAlive : isAlive, neighboursAliveCount : neighboursAliveCount, nextGenerationMessage:nextGenerationMessage}
            return currentCellStatus

        },
        nextGeneration(){
            const matrix = document.getElementById('matrix')
            const cells = matrix.children
            const tmp = [];

            for (let cell of cells) {
                tmp.push(this.getStatus(cell))
            }

            let i = 0;
            for(let cell of cells) {
                if(!tmp[i].isAlive) {
                    if(tmp[i].neighboursAliveCount == 3) {
                        this.ressurect(cell)
                    } else {
                        //stay dead
                    }
                } else if (tmp[i].isAlive) {
                    if(tmp[i].neighboursAliveCount < 2) {
                        this.kill(cell)
                    } else if(tmp[i].neighboursAliveCount > 3){
                        this.kill(cell)
                    } else {
                        //stay alive
                    }
                }
                ++i
            }
        }
    },

    mounted() {
        this.$nextTick(this.initGrid())
    }

}


Vue.createApp(ConvueApp).mount('#convue-app')