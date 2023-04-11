import Typography from "antd/es/typography/Typography"

function AppFooter() {
    return <div className="AppFooter">
        <Typography.Link href="tel:+123456789">Telefone</Typography.Link>
        <Typography.Link>Privacy Policy</Typography.Link>
        <Typography.Link>Terms of Use</Typography.Link>
    </div>
}

export default AppFooter