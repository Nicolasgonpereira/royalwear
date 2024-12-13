export default function Page() {
	return (
		<main className="h-full py-12 px-6">
			<div className="max-w-4xl mx-auto">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">
						Sobre o Projeto Royal Wear
					</h1>
					<div className="mt-4 mx-auto">
						<p>
							O Royal Wear é um projeto pessoal desenvolvido para
							demonstrar minhas habilidades e conhecimentos em
							desenvolvimento web moderno.
						</p>
						<div className="px-6 mt-8">
							<h2 className="text-2xl font-bold mb-4">
								Tecnologias Utilizadas
							</h2>
							<ul className="list-disc list-inside space-y-2">
								<li>Next.js 13 com App Router</li>
								<li>TypeScript</li>
								<li>Tailwind CSS</li>
								<li>React</li>
							</ul>
						</div>
						<div className="px-6 mt-8">
							<h2 className="text-2xl font-bold mb-4">
								Objetivos do Projeto
							</h2>
							<p>
								Este projeto foi desenvolvido para demonstrar
								proficiência em:
							</p>
							<ul className="list-disc list-inside space-y-2">
								<li>
									Desenvolvimento de interfaces modernas e
									responsivas
								</li>
								<li>
									Boas práticas de programação e clean code
								</li>
								<li>Gerenciamento de estado e rotas</li>
								<li>Integração com APIs e serviços externos</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
