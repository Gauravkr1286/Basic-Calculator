class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear() {
        this.currentOpreand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete() {
        this.currentOpreand = this.currentOpreand.toString().slice(0, -1)
    }
    appendnumber(number) {
        if (number === '.' && this.currentOpreand.includes('.')) return
        this.currentOpreand = this.currentOpreand.toString() + number.toString()
    }

    chooseOpreation(operation) {
        if (this.currentOpreand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOpreand
        this.currentOpreand = ''
    }

    compute() {
        let comutation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOpreand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                comutation = prev + current
                break
            case '-':
                comutation = prev - current
                break
            case '*':
                comutation = prev * current
                break
            case '/':
                comutation = prev / current
                break
            default:
                return
        }
        this.currentOpreand = comutation
        this.operation = undefined
        this.previousOperand = ''
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOpreand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allclearButton = document.querySelector('[data-allclear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendnumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOpreation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
allclearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})