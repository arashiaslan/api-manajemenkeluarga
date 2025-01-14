export class FamilyService {
    familymembers = [
        {id: 0, name: 'Ayah', age: 45, gender: 'male'},
        {id: 1, name: 'Ibu', age: 37, gender: 'female'},
        {id: 2, name: 'Kakak', age: 19, gender: 'male'},
        {id: 3, name: 'Adik', age: 10, gender: 'female'}
    ];

    getJsonFamilyMembers() {
        return JSON.stringify({
            code: 200,
            status: 'OK',
            data: this.familymembers.map((value) => ({
                id: value.id,
                name: value.name,
                age: value.age,
                gender: value.gender
            }))
        });
    }

    getFamilyMembers(req, res) {
        res.write(this.getJsonFamilyMembers());
        res.end();
    }

    addFamilyMember(req, res) {
        req.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            const newMember = {
                id: this.familymembers.length,
                name: body.name,
                age: body.age,
                gender: body.gender
            };
            this.familymembers.push(newMember);
            res.write(this.getJsonFamilyMembers());
            res.end();
        });
    }

    updateFamilyMember(req, res) {
        const memberId = parseInt(req.params.id);
        req.addListener("data", (data) => {
            const body = JSON.parse(data.toString());
            let memberUpdated = false;
            this.familymembers = this.familymembers.map((member) => {
                if (member.id === memberId) {
                    memberUpdated = true;
                    return {
                        id: memberId,
                        name: body.name,
                        age: body.age,
                        gender: body.gender
                    };
                }
                return member;
            });
            if (memberUpdated) {
                res.write(this.getJsonFamilyMembers());
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify({ message: `Anggota Keluarga dengan id ${memberId} tidak ditemukan.` }));
            }
            res.end();
        });
    }

    deleteFamilyMember(req, res) {
        const memberId = parseInt(req.params.id);
        const initialLength = this.familymembers.length;
        this.familymembers = this.familymembers.filter(member => member.id !== memberId);
        if (this.familymembers.length < initialLength) {
            res.write(this.getJsonFamilyMembers());
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ message: `Anggota Keluarga dengan id ${memberId} tidak ditemukan.` }));
        }
        res.end();
    }
}
