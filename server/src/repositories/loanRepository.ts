import { CreateLoanDto } from "../dtos/loanDto";
import { Status } from "@prisma/client";
import prisma from "@database";

const loanRepository = {
  //create a new loan in the database
  create(data: CreateLoanDto) {
    return prisma.loan.create({ data });
  },
  //find a loan by its ID
  findLoanById(id: string) {
    return prisma.loan.findUnique({ where: { id } });
  },

  findLoanByName(name: string) {
    return prisma.loan.findMany({ where: { Name: name } });
  },
  //find all loans in the database
  findAllLoans() {
    return prisma.loan.findMany({
      include: { book: true },
      orderBy: {
        //para ordenar
        dateBorrow: "desc",
      },
    });
  },
  //delete a loan by its ID
  deleteLoan(id: string) {
    return prisma.loan.delete({ where: { id } });
  },
updateLoanStatus(id: string, status: Status) {
  return prisma.loan.update({
    where: { id },
    data: { statusBook: status },
  });
},
};

export default loanRepository;
