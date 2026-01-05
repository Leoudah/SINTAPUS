import { useEffect, useState } from "react";
import { fetchPublications } from "../../api/admin.api";
import AdminNavbar from "../../components/AdminNavbar";
import AdminFilter from "../../components/AdminFilter";
import PublicationTable from "../../components/PublicationTable";

export default function ManagePublication() {
    const [status, setStatus] = useState("");
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(false);
    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetchPublications(status || undefined);
            setPublications(res.data.data);
        } catch (err) {
            alert("Gagal memuat data publikasi");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadData();
    }, [status]);
    return (
        <div className="min-h-screen">
            <AdminNavbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Manage Publication</h1>
                <AdminFilter status={status} setStatus={setStatus} />
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <PublicationTable publications={publications} onUpdate={loadData} />
                )}
            </div>
        </div>
    );
}