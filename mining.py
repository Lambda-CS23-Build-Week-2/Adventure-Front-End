import hashlib

def proof_of_work(last_proof):
    """
    Multi-Ouroboros of Work Algorithm
    - Find a number p' such that the last six digits of hash(p) are equal
    to the first six digits of hash(p')
    - IE:  last_hash: ...AE9123456, new hash 123456888...
    - p is the previous proof, and p' is the new proof
    - Use the same method to generate SHA-256 hashes as the examples in class
    """

    print("Searching for next proof")
    proof = 0
    #  TODO: Your code here
    last_proof_string = f"{last_proof}".encode()
    last_proof_hash = hashlib.sha256(last_proof_string).hexdigest()

    while valid_proof(last_proof_hash, proof) is False:
        proof += 1

    print("Proof found: " + str(proof) + " in ")
    return proof


def valid_proof(last_hash, proof):
    """
    Validates the Proof:  Multi-ouroborus:  Do the last six characters of
    the hash of the last proof match the first six characters of the hash
    of the new proof?

    IE:  last_hash: ...AE9123456, new hash 123456E88...
    """

    # TODO: Your code here!
    guess = f'{proof}{last_hash}'.encode()
    guess_hash = hashlib.sha256(guess).hexdigest()
    # print(guess_hash, 'guess hash')
    # print(last_hash, 'last hash')

    # return guess_hash[:3] == last_hash[-3:]
    # return guess_hash[:6] == last_hash[:6]
    # print(guess_hash[:6], 'guess hash sliced')
    
    # if c:
    #     return guess_hash 
    leading_zero = '000000'
    return guess_hash[:6] == leading_zero


new_proof = proof_of_work(34932474816)  
print(new_proof, "latest proof to mine a coin")