import http from 'http';
import {FamilyService} from './family-service.mjs';
import url from 'url';

const service = new FamilyService();
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // Parsing URL untuk mendapatkan ID (jika ada)
    const parsedUrl = url.parse(req.url, true);
    const pathParts = parsedUrl.pathname.split('/');
    const id = pathParts.length > 2 ? parseInt(pathParts[2], 10) : null;

    if (req.method === 'GET' && pathParts[1] === 'family') {
        if (id !== null) {
            // Jika ID diberikan, cari anggota keluarga berdasarkan ID
            const member = service.familymembers.find(member => member.id === id);
            if (member) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    code: 200,
                    status: 'OK',
                    data: member
                }));
            } else {
                // Jika ID tidak ditemukan
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    code: 404,
                    status: 'Not Found',
                    message: `Anggota Keluarga dengan id ${id} tidak ditemukan.`
                }));
            }
        } else {
            // Jika ID tidak diberikan, tampilkan semua anggota keluarga
            service.getFamilyMembers(req, res);
        }
    } else if (req.method === 'POST' && pathParts[1] === 'family') {
        service.addFamilyMember(req, res);
    } else if (req.method === 'PUT' && pathParts[1] === 'family' && id !== null) {
        req.params = { id }; // Menambahkan params ke request
        service.updateFamilyMember(req, res);
    } else if (req.method === 'DELETE' && pathParts[1] === 'family' && id !== null) {
        req.params = { id }; // Menambahkan params ke request
        service.deleteFamilyMember(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'URL kurang valid, tambahkan /family di akhir URL' }));
    }
});


server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});