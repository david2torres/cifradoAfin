import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'cifradoAfin';
  public a!: number;
  public b!: number;
  public aDes!: any;
  public bDes!: any;
  public n: number = 0;
  public mcd!: number;
  public i!: number;
  public textACifrar = ""
  public textValid = ""
  public encyptMessage: String = '';
  public encryptMessageT = ''
  public mensajeError: string = "";
  public showError = false;
  public decryptMessage2: any;
  public content: any = [];
  public arrLess: any;
  public arrMore: any;
  public arrFrecuency: any;
  public show: boolean = false;

  public abecedario = new Map<string, number>([
    ["a", 0], ["b", 1], ["c", 2], ["d", 3], ["e", 4], ["f", 5], ["g", 6],
    ["h", 7], ["i", 8], ["j", 9], ["k", 10], ["l", 11], ["m", 12], ["n", 13],
    ["ñ", 14], ["o", 15], ["p", 16], ["q", 17], ["r", 18], ["s", 19], ["t", 20],
    ["u", 21], ["v", 22], ["w", 23], ["x", 24], ["y", 25], ["z", 26]
  ]);

  public Frecuency = new Map<string, number>([
    ["e", 4], ["a", 0], ["o", 15], ["l", 11], ["s", 19], ["n", 13], ["d", 3],
    ["r", 18], ["u", 21], ["i", 8], ["t", 20], ["c", 2], ["p", 16], ["m", 12],
    ["y", 25], ["q", 17], ["b", 1], ["h", 7], ["g", 6], ["f", 5], ["v", 22],
    ["j", 9], ["ñ", 14], ["z", 26], ["x", 24], ["k", 10], ["w", 23]
  ]);

  constructor() {
    this.n = this.abecedario.size;
  }

  encriptar(a: number, b: number) {
    this.a = a;
    this.b = b;
    this.adjustText(this.textACifrar);
    this.validateCoprimos();
  }

  adjustText(text?: any) {
    this.textValid = this.replaceAccents(text)
    this.textValid = this.replaceNumber(this.textValid)
    this.textValid = this.textValid.replace(/[^a-zñvÑV]/ig, "");
    this.textValid = this.textValid.toLowerCase();
  }

  replaceAccents = (s: string) => {
    var r = s.toLowerCase();
    r = r.replace(new RegExp("[àáâãäåá]", 'g'), "a");
    r = r.replace(new RegExp("[èéêë]", 'g'), "e");
    r = r.replace(new RegExp("[ìíîï]", 'g'), "i");
    r = r.replace(new RegExp("[òóôõö]", 'g'), "o");
    r = r.replace(new RegExp("[ùúûü]", 'g'), "u");
    r = r.replace(new RegExp("[ýÿ]", 'g'), "y");
    return r;
  }

  replaceNumber = (s: string) => {
    var r = s.toLowerCase();
    r = r.replace(new RegExp("[1]", 'g'), "UNO");
    r = r.replace(new RegExp("[2]", 'g'), "DOS");
    r = r.replace(new RegExp("[3]", 'g'), "TRES");
    r = r.replace(new RegExp("[4]", 'g'), "CUATRO");
    r = r.replace(new RegExp("[5]", 'g'), "CINCO");
    r = r.replace(new RegExp("[6]", 'g'), "SEIS");
    r = r.replace(new RegExp("[7]", 'g'), "SIETE");
    r = r.replace(new RegExp("[8]", 'g'), "OCHO");
    r = r.replace(new RegExp("[9]", 'g'), "NUEVE");
    r = r.replace(new RegExp("[0]", 'g'), "CERO");
    return r;
  }

  validateCoprimos() {
    this.maximoComunDivisor(this.a, this.n)
    this.mcd === 1 ? this.encrypt() : this.viewError();
  }

  encrypt() {
    if (this.a >= 0 && this.b <= this.n) {
      let contains: any;
      let encyptMessage: any = [];
      for (const iterator of this.textValid) {
        contains = this.abecedario.get(iterator);
        let newLetter = ((this.a * contains) + this.b) % this.n;
        for (const iterator2 of this.abecedario.entries()) {
          if (iterator2[1] == newLetter) {
            encyptMessage.push(iterator2[0])
          }
        }
      }
      this.encyptMessage = String(encyptMessage).split(',').join('');
    } else {
      this.viewError()
    }
  }

  maximoComunDivisor(a: number, b: number): any {
    if (b == 0) return this.mcd = a
    return this.mcd = this.maximoComunDivisor(b, a % b);
  }

  viewError() {
    this.showError = true
    if (this.mcd == 1) {
      this.mensajeError = "Los numeros a y n no son coprimos"
    }
    if (this.a <= 0) {
      this.mensajeError = "La Constante Decimación (A) debe ser mayor a Cero"
    } else if (this.b >= this.n) {
      this.mensajeError = "La Constante Desplazamiento (B) no puede ser mayor que n = 27"
    }
  }

  closeError() {
    this.showError = false
  }

  //Desencriptar

  decryptText() {
    this.decryptMessage2 = ' '
    this.content = []
    this.adjustText(this.encryptMessageT);
    this.encryptMessageT = this.textValid;
    setTimeout(() => {
      this.calculateConcurrent(this.textValid)
      // this.calculateInverso();
    }, 1000);
  }

  //Calcular Estadistica de mensaje cifrado
  calculateConcurrent(msg: any) {
    let myMap = new Map<string, number>();
    for (const iterator of msg) {
      let coincidence = 0;
      for (const iterator2 of msg) {
        if (iterator == iterator2) {
          coincidence += 1;
        }
      }
      myMap.set(iterator, coincidence)
    }
    console.log("Map", myMap)
    this.takeMoreless(myMap);
  }

  //Toma los que mas se repitten
  takeMoreless(myMap: Map<string, number>) {
    console.log("mapPrincipal", myMap)
    let auxMore: Map<string, number> = this.setMapMore(myMap);
    let frecuency: Map<string, number> = this.setMapFrecuency();
    this.arrMore = Array.from(auxMore, ([name, value]) => ({ name, value }));
    this.arrFrecuency = Array.from(frecuency, ([name, value]) => ({ name, value }));
    this.validateValueMore();
    // this.setMapFrecuency();
    this.show = true;
  }

  //Setea New Map al nuevo array de latras mas repetidas del mensaje encriptado
  setMapMore(myMap: any) {
    let aux = new Map<string, number>();
    myMap = new Map([...myMap.entries()].sort((a, b) => b[1] - a[1]));
    let tam = 0;
    for (const entry of myMap.entries()) {
      if (tam < 2) {
        aux.set(entry[0], entry[1])
      }
      tam += 1
    }
    console.log("Aux Mayores", aux)
    return aux;
  }

  //Sette New Array valores de Frecuencia
  setMapFrecuency() {
    let tam = 0;
    let aux = new Map<string, number>();
    for (const entry of this.Frecuency.entries()) {
      if (tam < 2) {
        aux.set(entry[0], entry[1])
      }
      tam += 1
    }
    console.log("Aux EQUIVALENTES", aux)
    return aux;
  }

  //Valida valores repetidos para setearle valor correspondiente
  validateValueMore() {
    for (let i = 0; i < this.arrMore.length; i++) {
      this.asignLetterMore(this.arrMore[i].name, i);
    }
    this.getDiferences();
  }

  //Asigna valores Numericos Correspondientes de abecedario a letras mas repetidas
  asignLetterMore(letter: any, position: any) {
    for (const iterator2 of this.abecedario.entries()) {
      if (iterator2[0] == letter) {
        this.arrMore[position].value = iterator2[1]
      }
    }
    console.log("Array More", this.arrMore)
  }

  //Evalua las diferencia de los frecuencias y concurrencias
  getDiferences() {
    let difMoreRepeat;
    let difConcurrence;
    let valueA;
    let valueB;
    difMoreRepeat = this.arrMore[0].value - this.arrMore[1].value;
    difMoreRepeat = this.validateThanZer(difMoreRepeat);

    difConcurrence = this.arrFrecuency[0].value - this.arrFrecuency[1].value;
    difConcurrence = this.validateThanZer(difConcurrence);

    //En este Inverso esta el problema
    let inverso = this.getInvested(difConcurrence);

    if (inverso > 0) {
      valueA = (difMoreRepeat * inverso) % this.n;
      valueB = this.arrMore[0].value - (valueA * this.arrFrecuency[0].value) % this.n;
      valueB = this.validateThanZer(valueB);
    }
    this.aDes = valueA;
    this.bDes = valueB;
    console.log("inverso", inverso)
    console.log("Value A", valueA)
    console.log("Value B", valueB)
    this.calculateInverso();
    this.decryptMessage();
  }

  //Valida que sea mayor que cero
  validateThanZer(num: any) {
    let value;
    num > 0 ? value = num : value = num + this.n;
    return value;
  }

  getInvested(num: any) {
    let invested = 0;
    let residuo;
    for (let i = 0; i < this.n; i++) {
      residuo = ((num * i) % this.n)
      if (residuo == 1) {
        invested = i
      }
    }
    this.i = invested;
    return invested;
  }

  //Calcula Inverso
  calculateInverso() {
    for (const iterator2 of this.abecedario.entries()) {
      if (((this.aDes * iterator2[1]) % this.n) == 1) {
        this.i = iterator2[1]
      }
    }
    console.log("Inverso 2", this.i)
    // this.decryptMessage();
  }

  //Desencript mensaje
  decryptMessage() {
    let decryptMessage: any = [];
    let newLetter;
    let contains: any;
    let preModulo: any;
    this.encryptMessageT = this.textValid;
    console.log("Normalixe", this.encryptMessageT)
    debugger
    for (const iterator of this.textValid) {
      contains = this.abecedario.get(iterator);
      preModulo = (this.i * (contains - this.bDes))

      if (preModulo < 0) {
        do {
          preModulo += this.n;
        } while (preModulo < 0);
      }
      newLetter = (preModulo % this.n)
      decryptMessage = this.asignLetter(newLetter)
      this.decryptMessage2 = String(decryptMessage).split(',').join('');
    }
  }

  //Asigna Letras
  asignLetter(newLetter: any) {
    for (const iterator2 of this.abecedario.entries()) {
      if (iterator2[1] == newLetter) {
        this.content.push(iterator2[0])
      }
    }
    return this.content;
  }

}
