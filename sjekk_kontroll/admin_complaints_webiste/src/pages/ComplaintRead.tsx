import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Card, Button, Input, Spin, Typography, List, Modal, Col, Row, Image, message, Descriptions, DescriptionsProps } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
import { Document, Page } from 'react-pdf';
import Navbar from "../components/Navbar";
import { FileImageOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
// import {
//   EditorState,
//   ContentState,
//   convertToRaw,
//   RichUtils,
//   getDefaultKeyBinding,
//   KeyBindingUtil,
//   CompositeDecorator,
//   Modifier,
// } from "draft-js";
import './ComplaintRead.css'
import 'draft-js/dist/Draft.css'
import '@draft-js-plugins/inline-toolbar/lib/plugin.css'
import 'draft-js/dist/Draft.css'
import '@draft-js-plugins/linkify/lib/plugin.css'
import { postActionOnComplaint } from "../redux/features/post_action_on_complaint";
import { unwrapResult } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import Rule from "../interfaces/Rule";
import { getCurrentComplaintTicket } from "../redux/features/complaints_reducer";



const { TextArea } = Input;

const SingleComplaintPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();


  const [reply, setReply] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedAttachment, setSelectedAttachment] = useState<string | null>(null);
  const [isPdf, setIsPdf] = useState<boolean>(false);
  const { loading, current_complaint, current_ticket, error } = useAppSelector(state => state.complaints);


  useEffect(() => {
    dispatch(getCurrentComplaintTicket(current_complaint.ticket_number));
  }, [current_complaint.ticket_number, dispatch]);


  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);  
  // const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());  

  // const editorRef = useRef(null);



  const openModal = (attachmentPath: string, isPdf: boolean) => {
    if(!isPdf) return
    setSelectedAttachment(attachmentPath);
    setIsPdf(isPdf);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedAttachment(null);
    setIsPdf(false);
    setPageNumber(1); // Reset page number to the first page
    setModalVisible(false);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleCompleteComplaints = async () => {
    const confirm = Modal.confirm;
    confirm({
      title: t('are_you_sure'),
      content: t('complaint_delete_warning'),
      okText: t('yes'),
      cancelText: t('no'),
      onOk: async () => {
        await dispatch(postActionOnComplaint({
          message: reply,
          status: 'completed',
          id: id!
        }))
        .then(unwrapResult)
        .then(() => {
          
        }).catch((error) => {
          console.log((error as Error).message);
          
        })

        handleShowAlert()
      }
    })
  }

  const handleRejectComplaints = async () => {
    const confirm = Modal.confirm;
    confirm({
      title: t('are_you_sure'),
      content: t('complaint_reject_warning'),
      okText: t('yes'),
      cancelText: t('no'),
      onOk: async () => {
        await dispatch(postActionOnComplaint({
          message: reply,
          status: 'rejected',
          id: id!
        }))
        .then(unwrapResult)
        .then(() => {

        }).catch((error) => {
          console.log((error as Error).message);
          
        })
      }
    })
  }

  const handleDeleteComplaints = async () => {
    const confirm = Modal.confirm;
    confirm({
      title: t('are_you_sure'),
      content: t('complaint_delete_warning'),
      okText: t('yes'),
      cancelText: t('no'),
      onOk: async () => {
        await dispatch(postActionOnComplaint({
          message: reply,
          status: 'deleted',
          id: id!
        }))
        .then(unwrapResult)
        .then(() => {

        }).catch((error) => {
          console.log((error as Error).message);
          
        })
      }
    })
  }

  // const linkifyPlugin = createLinkifyPlugin();

  // // Create inline toolbar plugin
  // const inlineToolbarPlugin = createInlineToolbarPlugin({
    
  // });
  // const { InlineToolbar } = inlineToolbarPlugin;
  
  //   // Function to handle editor key bindings
  // const handleKeyCommand = (command, editorState) => {
  //   const newState = RichUtils.handleKeyCommand(editorState, command);

  //   if (newState) {
  //     // If the state is updated by RichUtils, update the editor state
  //     setEditorState(newState);
  //     return "handled";
  //   }

  //   // If the state is not updated by RichUtils, allow default handling
  //   return "not-handled";
  // };

  // // Function to handle custom key bindings
  // const mapKeyToEditorCommand = (e) => {
  //   if (e.keyCode === 9 /* TAB key */) {
  //     const newEditorState = RichUtils.onTab(
  //       e,
  //       editorState,
  //       3 /* maximum depth of nested lists */
  //     );
  //     if (newEditorState !== editorState) {
  //       setEditorState(newEditorState);
  //     }
  //     return "handled";
  //   }
  //   return getDefaultKeyBinding(e);
  // };

  // const focus = () => {
  //   editorRef?.current?.focus();
  // };

  // // Function to toggle inline styles (e.g., bold, italic)
  // const toggleInlineStyle = (style) => {
  //   setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  // };

  // // Function to toggle block styles (e.g., headers, lists)
  // const toggleBlockType = (blockType) => {
  //   setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  // };

  //   // Function to find link entities in the editor content
  //   const findLinkEntities = (contentBlock, callback, contentState) => {
  //     contentBlock.findEntityRanges(
  //       (character) => {
  //         const entityKey = character.getEntity();
  //         return (
  //           entityKey !== null &&
  //           contentState.getEntity(entityKey).getType() === "LINK"
  //         );
  //       },
  //       callback
  //     );
  //   };

  //     // Component for rendering linked text
  // const Link = (props) => {
  //   const contentState = editorState.getCurrentContent();
  //   const { url } = contentState.getEntity(props.entityKey).getData();
  //   return (
  //     <a href={url} style={{ color: "blue" }} target="_blank" rel="noopener noreferrer">
  //       {props.children}
  //     </a>
  //   );
  // };


  // // Custom decorator to highlight linked text
  // const linkDecorator = new CompositeDecorator([
  //   {
  //     strategy: findLinkEntities,
  //     component: Link,
  //   },
  // ]);

  const navigate = useNavigate()
  const [t] = useTranslation()

  const handleShowAlert = () => {
    message.success(t('action_success'));
    setTimeout(() => {
      navigate('/')
    },2000)
  };

  const getDescriptionItems = (rule: Rule): DescriptionsProps['items'] => {
    const items: DescriptionsProps['items'] = []

    if(rule.extras.meter_receipt_number){
      items.push({
        key: rule.name,
        label: 'Meter Receipt Number',
        children: rule.extras_values.meter_receipt_number
      })
    }

    if(rule.extras.meter_number){
      items.push({
        key: rule.name,
        label: 'Meter Number',
        children: rule.extras_values.meter_number
      })
    }
    if(rule.extras.expiry_date){
      items.push({
        key: rule.name,
        label: 'Expiry Date',
        children: rule.extras_values.expiry_date
      })
    }
    if(rule.extras.paid_amount){
      items.push({
        key: rule.name,
        label: 'Paid Amount',
        children: rule.extras_values.paid_amount
      })
    }

    return items;
  }

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        {loading && <Spin size="large" style={{ margin: '20px' }} />}
        {error && <Typography.Text type="danger">{t('error')}: {error}</Typography.Text>}
        {current_complaint && (
          <Card
            style={{ borderRadius: '8px', border: '3px solid #e8e8e8', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
          >
            <Row gutter={[16, 16]}>
              {/* Personal Information */}
              <Col span={8}>
                <Typography.Title level={4}>{t('personal_information')}</Typography.Title>
                <Row>
                  <Col span={12}>
                  <List>
                  <List.Item>
                    <List.Item.Meta
                      title={t('name')}
                      description={`${current_complaint.first_name} ${current_complaint.last_name}`}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={t('email')}
                      description={`${current_complaint.email}`}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title={t('phone')}
                      description={`${current_complaint.phone_number}`}
                    />
                  </List.Item>

                </List>
                  </Col>
                  <Col span={12}>
                    <List>
                    <List.Item>
                    <List.Item.Meta title={t('postal_code')} description={current_complaint.postal_code} />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title={t('city')} description={current_complaint.city} />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta title={t('country')} description={current_complaint.country} />
                  </List.Item>
                    </List>
                  </Col>
                </Row>

                <Row>
                  <Col span={24}>
                  <List.Item>
                    <List.Item.Meta title={t('address')} description={current_complaint.address} />
                  </List.Item>
                  </Col>
                </Row>
              </Col>

              {/* Complaint Information */}
              <Col span={8}>
                <Typography.Title level={4}>{t('complaint_information')}</Typography.Title>
                <Typography.Paragraph>{current_complaint.complaint_text}</Typography.Paragraph>

                <br />

                <Typography.Title level={4}>{t('car_information')}</Typography.Title>
                <Row>
                  <Col span={12}>
                  <List>
                <List.Item>
                  <List.Item.Meta
                    title={t('plate_number')}
                    description={`${current_ticket?.plate_info.plate_number}`}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={t('brand')}
                    description={`${current_ticket?.plate_info.car_model}`}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={t('year')}
                    description={`${current_ticket?.plate_info.manufacture_year}`}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={t('description')}
                    description={`${current_ticket?.plate_info.car_description}`}
                  />
                </List.Item>
                </List>
                  </Col>
                  <Col span={12}>
                  <List>
                <List.Item>
                  <List.Item.Meta
                    title={t('type')}
                    description={`${current_ticket?.plate_info.car_type}`}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={t('color')}
                    description={`${current_ticket?.plate_info.car_color}`}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={t('land')}
                    description={`${current_ticket?.plate_info.country_name} - ${current_ticket?.plate_info.country_code}`}
                  />
                </List.Item>

                </List>
                  </Col>
                </Row>

              </Col>

              <Col span={8}>
              <Typography.Title level={4}>{t('ticket_information')}</Typography.Title>                

                <Row gutter={[
                  12,12
                ]}>
                  <Col span={16}>
                    <Row>
                    <Col span={12}>
                <List>
                <List.Item>
                  <List.Item.Meta
                    title={t('place')}
                    description={`${current_ticket?.place.location} ${current_ticket?.place.code}`}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={t('Ticket Comment')}
                    description={`${current_ticket?.ticket_comment}`}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={t('ticket_number')}
                    description={`${current_ticket?.ticket_info.ticket_number}`}
                  />
                </List.Item>
                
                </List>
                  </Col>
                  <Col span={12}>
                    <List>
                    <List.Item>
                  <List.Item.Meta
                    title={t('created_by')}
                    description={`${current_ticket?.created_by.pnid}`}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={t('created_at')}
                    description={`${current_ticket?.created_at}`}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={t('delivered_by')}
                    description={`${current_ticket?.ticket_info.print_option}`}
                  />
                </List.Item>
                    </List>


                  </Col>

                  <Col span={24} style={{ marginTop: '10px' }}>
                    <Typography.Title level={4}>{t('serial_number')}</Typography.Title>
                    <Typography.Text>{current_ticket?.ticket_info.serial_number}</Typography.Text>
                  </Col>  
                  
                  <Col span={24} style={{ marginTop: '10px' }}>
                  <Typography.Title level={4}>{t('serial_image')}</Typography.Title>

                  <Image src={current_ticket?.ticket_info.barcode_image} width="100%"/>
                  </Col>

                    </Row>
                  </Col>

                  <Col span={8}>
                <Image src={current_ticket?.ticket_info.ticket_image} width={100} height={500}></Image>
                  </Col>
                </Row>

                
              </Col>
            </Row>
            <Typography.Title level={4}>{t('rules_information')}</Typography.Title>
                <List>
                  {current_ticket?.rules.map((rule) => {
                    return (<>
                     <List.Item>
                      <List.Item.Meta title={t(`rule ${current_ticket?.rules.indexOf(rule) + 1}`)} description={rule.name} />
                    </List.Item>
                    <Descriptions layout="vertical" bordered items={getDescriptionItems(rule)} size="small" column={4}/>
                    </>);
                  })}
                </List>


            {/* Attachments */}
            <Typography.Title level={4}>{t('attachments')}</Typography.Title>
            <Row gutter={[16, 16]}>
              {current_complaint.attachments.map((attachment) => (
                <Col key={attachment.file_name} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    style={{ width: '100%' }}
                    cover={attachment.file_type === 'image' ? (
                      <Image
                        alt={attachment.file_name}
                        src={attachment.file_path}
                      />
                    ) : (
                      <FileImageOutlined style={{ fontSize: '64px', margin: '16px' }} />
                    )}
                    onClick={() => openModal(attachment.file_path, attachment.file_type === 'pdf')}
                  >
                    <Card.Meta title={attachment.file_name} />
                  </Card>
                </Col>
              ))}


            <TextArea     placeholder={t('enter_message')} rows={5} value={reply} onChange={(event) => setReply(event.target.value)}/>


            </Row>
                      <br />
            <div className="controllers">
                {
                  current_complaint.status != 'completed' && (
                    <Button
                      type="primary"
                      icon={<CheckOutlined />}
                      onClick={() => handleCompleteComplaints()}
                      style={{
                        marginRight:'4px'
                      }}
                    >
                      {t('complete')}
                    </Button>
                  )
                }
                <Button
                danger
                type="primary"
                  icon={<CloseOutlined />}
                  onClick={() => handleRejectComplaints()}
                  style={{
                    marginRight:'4px'
                  }}
                >
                  {t('reject')}
                </Button>
                <Button
                  danger
                  type="primary"
                  icon={<CloseOutlined />}
                  onClick={() => handleDeleteComplaints()}
                  style={{
                    marginRight:'4px'
                  }}
                >
                  {t("delete")}
                </Button>
            </div>
          </Card>
        )}
        
      </div>

      {/* Image/PDF Modal */}
      <Modal
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={isPdf ? 800 : undefined}
      >
        {selectedAttachment && (
          isPdf ? (
            <>
              <div  style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 1 ,backgroundColor:'#eee', marginTop: '20px', padding:'8px'}}>
                <Button onClick={handlePrevPage} disabled={pageNumber <= 1} type="primary">{t('previous')}</Button>
                <span style={{ margin: '0 10px' }}>
                  {t('page')} {pageNumber} {t('of')} {numPages}
                </span>
                <Button onClick={handleNextPage} disabled={pageNumber >= numPages} type="primary">{t('next')}</Button>
              </div>
              <Document file={selectedAttachment} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} width={700} />
              </Document>
            </>
          ) : (
            <Image
              src={selectedAttachment}
              alt={t('attachment')}
              style={{ width: '100%', maxHeight: '60vh', objectFit: 'contain' }}
            />
          )
        )}
      </Modal>
      
    </>
  );
};

export default SingleComplaintPage;
