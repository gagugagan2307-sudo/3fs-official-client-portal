const $=s=>document.querySelector(s);
const today=new Date().toISOString().split('T')[0];
const dateInput=document.querySelector('input[name="projectDate"]'); if(dateInput) dateInput.min=today;
const planMap={Basic:['Basic — ₹4,999','₹4,999'],Standard:['Standard — ₹7,999','₹7,999'],Custom:['Custom Quote','Contact 3FS']};
function setPlan(v){const [name]=v.split('|');const p=planMap[name]||planMap.Standard;$('#paymentPlan').textContent=p[0];$('#paymentAmount').textContent=p[1];$('#receiptAmount').textContent=p[1];}
document.querySelectorAll('.choose').forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.plan;setPlan(v);const select=document.querySelector('select[name="plan"]');if(select)select.value=v;}));
const form=$('#enquiryForm');
form?.addEventListener('submit',e=>{e.preventDefault();const data=Object.fromEntries(new FormData(form));data.createdAt=new Date().toISOString();data.id='ENQ-'+Date.now();localStorage.setItem('3fs_last_enquiry',JSON.stringify(data));$('#enquiryStatus').textContent='Enquiry saved on this device. Connect Firebase to send it to the private 3FS team website in real time.';});
$('#demoPay')?.addEventListener('click',()=>{const id='3FS-'+Date.now();localStorage.setItem('3fs_demo_payment',JSON.stringify({orderId:id,amount:$('#paymentAmount').textContent,createdAt:new Date().toISOString(),status:'DEMO_ONLY'}));$('#orderId').textContent=id;$('#paymentStatus').textContent='Demo payment record created locally. No real money was charged.';location.hash='success';});
