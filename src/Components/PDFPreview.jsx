import { Document, Page, Text, View } from "@react-pdf/renderer"

function PDFPreview() {

    return (
        <div className="col-4">
            <a href="#">
                <Document file="C:\Documents\Cmds_polos.pdf" >
                    <Page pageNumber={1} >
                        <View>
                            <Text>Section #</Text>
                        </View>
                    </Page>
                </Document>
            </a>
        </div>
    )
}

export default PDFPreview