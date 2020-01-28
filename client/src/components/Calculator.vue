<template>
  <div class="calculator">
    <div class="output">
      <div data-previous-operand class="output__previous-operand">
        <template v-if="operation">{{ getDisplayNumber(previousOperand) }} {{ operation }}</template>
      </div>
      <div class="output__current-operand">{{ getDisplayNumber(currentOperand) }}</div>
    </div>

    <button @click="clear" class="btn">AC</button>
    <button @click="reverse" class="btn">+/-</button>
    <button @click="applyPercent" class="btn">%</button>

    <button @click="chooseOperation('÷')" class="btn btn--operation">&divide;</button>

    <button @click="appendChar('7')" class="btn">7</button>
    <button @click="appendChar('8')" class="btn">8</button>
    <button @click="appendChar('9')" class="btn">9</button>

    <button @click="chooseOperation('×')" class="btn btn--operation">&times;</button>

    <button @click="appendChar('4')" class="btn">4</button>
    <button @click="appendChar('5')" class="btn">5</button>
    <button @click="appendChar('6')" class="btn">6</button>

    <button @click="chooseOperation('-')" class="btn btn--operation">-</button>

    <button @click="appendChar('1')" class="btn">1</button>
    <button @click="appendChar('2')" class="btn">2</button>
    <button @click="appendChar('3')" class="btn">3</button>

    <button @click="chooseOperation('+')" class="btn btn--operation">+</button>

    <button @click="appendChar('0')" class="btn">0</button>
    <button @click="appendChar('.')" class="btn">.</button>
    <button @click="del" class="btn">
      <img src="../../assets/img/delete.svg" alt />
    </button>

    <button @click="compute" class="btn btn--operation">=</button>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      currentOperand: '',
      previousOperand: '',
      operation: undefined
    };
  },

  methods: {
    clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    },

    del() {
      this.currentOperand = this.currentOperand.slice(0, -1);
    },

    reverse() {
      this.currentOperand = (this.currentOperand * -1).toString();
    },

    applyPercent() {
      this.currentOperand = (this.currentOperand / 100).toString();
    },

    appendChar(char) {
      if (char === '.' && this.currentOperand.includes('.')) {
        return;
      }

      this.currentOperand = this.currentOperand + char;
    },

    chooseOperation(operation) {
      if (this.currentOperand === '') {
        if (this.previousOperand !== '') {
          this.operation = operation;
        }

        return;
      }
      if (this.previousOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    },

    async compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);

      if (isNaN(prev) || isNaN(current)) return;

      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '×':
          computation = prev * current;
          break;
        case '÷':
          computation = prev / current;
          break;
        default:
          return;
      }

      await this.$store.dispatch(
        'addRecord',
        `${this.previousOperand} ${this.operation} ${this.currentOperand} = ${computation}`
      );

      this.currentOperand = computation.toString();
      this.operation = undefined;
      this.previousOperand = '';
    },

    getDisplayNumber(number) {
      const stringNumber = number;
      const digits = stringNumber.split('.');

      const integerDigits = parseFloat(digits[0]);
      const decimalDigits = digits[1];

      let integerDisplay;

      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en');
      }

      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../assets/css/variables.scss';

.calculator {
  display: grid;
  grid-template-columns: repeat(4, 6.25rem);
  grid-template-rows: minmax(7.5rem, auto) repeat(5, 6.25rem);

  .btn {
    cursor: pointer;
    font-size: 2rem;
    border: none;
    outline: none;
    background: $dark-gray;
    color: white;

    &:hover {
      background: $gray;
    }

    &.btn--operation {
      background: $dark-purple;
      &:hover {
        background: $purple;
      }
    }
  }
}

.output {
  grid-column: 1 / -1;
  background-color: white;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  flex-direction: column;
  padding: 0.625rem;
  word-break: break-all;
  color: $dark-gray;

  &__previous-operand {
    font-size: 1.5rem;
  }

  &__current-operand {
    font-size: 2.5rem;
  }
}
</style>
