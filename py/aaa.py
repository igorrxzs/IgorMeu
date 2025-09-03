import random 
import time

emojis = ["😀", "😂", "😍", "😎", "🤔", "😢", "😡"]

print("Bem-vindo a roleta de caça-níqueis!")

while True:
    input("Pressione Enter para girar a roleta...")
    resultado = [random.choice(emojis) for _ in range(3)]
    print("Resultado:", " | ".join(resultado))

    for _ in range(3):
        time.sleep(0.5)
        print("Girando...", end="\r")
    print("Resultado final:", " | ".join(resultado))
    if resultado[0] == resultado[1] == resultado[2]:
        print("Parabéns! Você ganhou!")
    else:
        print("Tente novamente!")
    if input("Deseja jogar novamente? (s/n): ").lower() != 's':
        print("Obrigado por jogar!")
        break