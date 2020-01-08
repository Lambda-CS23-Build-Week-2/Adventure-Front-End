class Queue
{
    constructor(items)
    {
        this.items = []
    }

    enqueue(element)
    {
        this.items.push(element)
    }

    dequeue() 
    {
        if(this.isEmpty()) {
            return "Underflow"
        }

        return this.items.shift()

    }
}