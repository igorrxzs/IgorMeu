/* 1 - Escreva um programa solicita um numero 
e exibe a mensagem "SENAC" se este número for 14, 24, 23, 32 ou 33.



#include <stdio.h>

int main()
{
    int numero;
    printf("Insira um número: ");
    scanf("%d", &numero);
    if (numero == 14 || numero == 24 || numero == 23 || numero == 32 || numero == 33) {
        printf("SENAC");
    }

    return 0;
}
*/

/*2 - Escreva um programa que solicita um número inteiro. 
Exiba uma mensagem de erro se o número informado estiver
entre 15 e 25 ou entre 45 e 50 (inclusive).


#include <stdio.h>

int main ()
{
 int numero;
 printf("Insira um número: ");
 scanf("%d", &numero);
 if ((numero >= 15 && numero <= 25) || (numero >= 45 && numero <= 50)) {
     printf("ERRO");
 }
    return 0;
}
*/

/* 3 - Faça um algoritmo que solicita um número e 
mostre uma mensagem caso este número seja maior que 80, menor que 25 ou igual a 40.


#include <stdio.h> 
int main () {
    int numero;
    printf("Insira um número: ");
    scanf("%d", &numero);
    if ((numero >= 80 || numero <= 25 || numero == 40)) {
        printf("Esse número é aceito!");
    }
    
    return 0;
}
*/

/* 4 - Escrever um algoritmo que leia três valores inteiros e verifique se eles podem ser as medidas dos lados de um triângulo.
Propriedade: o comprimento de cada lado de um triângulo é menor do que a soma dos comprimentos dos outros dois lados.


#include <stdio.h>

int main () {
    int num1, num2, num3;
    printf("Digite tres lados: ");
    scanf("%d %d %d", &num1, &num2, &num3);
    if (num1 < num2 + num3 && num2 < num1 + num3 && num3 < num2 + num1) {
        printf("Isso vai ser um caralho de um triangulo");
    }
    else {
        printf("Não forma esse caraio");
    }
    
    return 0;
}


#include <stdio.h>

int main () {
    int num1, num2, num3;

    printf("Digite tres lados: ");
    scanf("%d %d %d", &num1, &num2, &num3);

    if (num1 < num2 + num3 && num2 < num1 + num3 && num3 < num1 + num2) {

        printf("Forma um triangulo");

        if (num1 == num2 && num2 == num3) {
            printf("Triangulo equilatero");
        }

        if ((num1 == num2 && num1 > num3) || (num1 == num2 && num1 < num3) ||
            (num1 == num3 && num1 > num2) || (num1 == num3 && num1 < num2) ||
            (num2 == num3 && num2 > num1) || (num2 == num3 && num2 < num1)) {
            printf("Triangulo isosceles\n");
        }

        if ((num1 > num2 || num1 < num2) &&
            (num1 > num3 || num1 < num3) &&
            (num2 > num3 || num2 < num3)) {
            printf("Triangulo escaleno");
        }

    } 
    else {
        printf("Nao forma triangulo");
    }

    return 0;
}
*/ //NÃO FIZ BOA PARTE DESSE CODIGO

/*
6 - Incremente o exercício anterior, agora informando se este é também um triângulo retângulo.
#include <stdio.h>

int main () {

    int num1, num2, num3;

    printf("Digite tres lados: ");
    scanf("%d %d %d", &num1, &num2, &num3);

    if (num1 < num2 + num3 && num2 < num1 + num3 && num3 < num1 + num2) {

        printf("Forma um triangulo");

        if (num1 == num2 && num2 == num3) {
            printf("Triangulo equilatero");
        }

        if (num1 == num2 || num1 == num3 || num2 == num3) {
            if (!(num1 == num2 && num2 == num3)) {
                printf("Triangulo isosceles");
            }
        }

        if (num1 != num2 && num1 != num3 && num2 != num3) {
            printf("Triangulo escaleno");
        }

        if ((num1*num1 + num2*num2 == num3*num3) ||
            (num1*num1 + num3*num3 == num2*num2) ||
            (num2*num2 + num3*num2 == num1*num1)) {

            printf("Tambem eh um triangulo retangulo");
        }

    }
    else {
        printf("Nao forma triangulo");
    }

    return 0;
}
*/

/* 7 - Crie um programa que desafia o usuário digitar um número maior que 40, 
que seja múltiplo de 5 e 7. Se ele conseguir, deve receber uma mensagem de parabéns.


#include <stdio.h>

int main () {
    int numero;
    printf("Digite um numero que seja maior que 40, multiplo de 5 e 7: ");
    scanf("%d", &numero);
    if (numero > 40 && numero % 5 == 0 && numero % 7 == 0) {
        printf("Parabèns, não fez mais que sua obrigação.");
    }
    
    return 0;
}
*/























LISTA MAIS DIFICIL DE TODAS QUE EU JA FIZ.
