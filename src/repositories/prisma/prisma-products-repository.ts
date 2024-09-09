import { prisma } from "@/lib/prisma";
import { Prisma, Product, Status } from "@prisma/client";
import { ProductsRepository } from "../products-repository";

export class PrismaProductsRepository implements ProductsRepository {
    async create(data: Prisma.ProductCreateInput): Promise<Product> {

        const product = await prisma.product.create({
            data,
        })

        return product
    }

    async findById(id: string) {
        const product = await prisma.product.findUnique({
            where: {
                id,
            }
        })

        return product
    }

    async fetch(page?: number) {
        if (!page) page = 1
        const products = await prisma.product.findMany({
            where: {
                status: 'ACTIVE'
            },
            take: 20,
            skip: (page - 1) * 20,
        })
        return products
    }

    async changeStatus(id: string, status: Status) {
        const product = await prisma.product.update({
            where: {
                id
            },
            data: {
                status: status
            }
        })
        return null
    }
}