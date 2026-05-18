import { CreateLoanDto } from "../dtos/loanDto";
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
  //find all loans in the database
  findAllLoans() {
    return prisma.loan.findMany();
  },
  //delete a loan by its ID
  deleteLoan(id: string) {
    return prisma.loan.delete({ where: { id } });
  },
};

export default loanRepository;
