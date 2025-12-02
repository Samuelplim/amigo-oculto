import { prisma } from './config/database';

async function testDatabase() {
  try {
    console.log('🔄 Testando conexão com o banco de dados...\n');

    // Teste 1: Criar 2 usuários
    console.log('1️⃣ Criando 2 usuários...');
    const usuario1 = await prisma.usuario.create({
      data: {
        nome: 'Maria Santos',
        senha: 'senha123'
      }
    });
    console.log('✅ Usuário 1 criado:', usuario1);

    const usuario2 = await prisma.usuario.create({
      data: {
        nome: 'João Silva',
        senha: 'senha456'
      }
    });
    console.log('✅ Usuário 2 criado:', usuario2);

    // Teste 2: Cadastrar os 2 usuários como participantes
    console.log('\n2️⃣ Cadastrando usuários como participantes...');
    const participante1 = await prisma.participante.create({
      data: {
        nome: usuario1.nome,
        senha: usuario1.senha,
        description: 'Participante amigo oculto',
        evento: 'Natal 2024'
      }
    });
    console.log('✅ Participante 1 criado:', participante1);

    const participante2 = await prisma.participante.create({
      data: {
        nome: usuario2.nome,
        senha: usuario2.senha,
        description: 'Participante amigo oculto',
        evento: 'Natal 2024'
      }
    });
    console.log('✅ Participante 2 criado:', participante2);

    // Teste 3: Criar presentes para os participantes
    console.log('\n3️⃣ Criando presentes para os participantes...');
    const presente1 = await prisma.presente.create({
      data: {
        nome: 'Livro de Culinária',
        descricao: 'Receitas deliciosas',
        participanteId: participante1.id
      }
    });
    console.log('✅ Presente 1 criado:', presente1);

    const presente2 = await prisma.presente.create({
      data: {
        nome: 'Fone de Ouvido',
        descricao: 'Bluetooth com cancelamento de ruído',
        participanteId: participante2.id
      }
    });
    console.log('✅ Presente 2 criado:', presente2);

    // Teste 4: Criar um grupo com os 2 participantes
    console.log('\n4️⃣ Criando grupo de sorteio...');
    const grupo = await prisma.grupoSorteio.create({
      data: {
        nome: 'Grupo Natal 2024',
        participantes: {
          create: [
            { participanteId: participante1.id },
            { participanteId: participante2.id }
          ]
        }
      },
      include: {
        participantes: {
          include: {
            participante: {
              include: {
                presentes: true
              }
            }
          }
        }
      }
    });
    console.log('✅ Grupo criado:', JSON.stringify(grupo, null, 2));

    // Teste 5: Criar sorteio no grupo
    console.log('\n5️⃣ Criando sorteio...');
    const sorteio = await prisma.sorteio.create({
      data: {
        grupoId: grupo.id,
        participanteId: participante1.id,
        participanteSorteadoId: participante2.id
      },
      include: {
        participante: true,
        participanteSorteado: true,
        grupo: true
      }
    });
    console.log('✅ Sorteio criado:', JSON.stringify(sorteio, null, 2));

    const sorteio2 = await prisma.sorteio.create({
      data: {
        grupoId: grupo.id,
        participanteId: participante2.id,
        participanteSorteadoId: participante1.id
      },
      include: {
        participante: true,
        participanteSorteado: true,
        grupo: true
      }
    });
    console.log('✅ Sorteio 2 criado:', JSON.stringify(sorteio2, null, 2));

    // Teste 6: Buscar grupo completo com sorteios
    console.log('\n6️⃣ Buscando grupo completo...');
    const grupoCompleto = await prisma.grupoSorteio.findUnique({
      where: { id: grupo.id },
      include: {
        participantes: {
          include: {
            participante: {
              include: {
                presentes: true
              }
            }
          }
        },
        sorteios: {
          include: {
            participante: true,
            participanteSorteado: true
          }
        }
      }
    });
    console.log('✅ Grupo completo:', JSON.stringify(grupoCompleto, null, 2));

    console.log('\n✅ Todos os testes passaram com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante os testes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
